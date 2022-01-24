/// File containing all the definitions of various classes & functions - maybe the start of a bigger library.

var mat4 = glMatrix.mat4;
var identity = new Float32Array(16);
mat4.identity(identity);
var model = new Float32Array(16);
mat4.identity(model);


class Scene {
    /// Scene class contains information on the current canvas & WebGL context and wraps it into a nice class...
    /// Scene constructor is called with the given canvas id.
    /// A main-loop function is supplied by the user as well. This may be altered later to switch graphs & stuff.

    constructor(canvas_id) {
        /// Declare the publically accessable variables defining the context - Graph Object, HTML canvas, & WebGL context.
        this.canvas = document.getElementById(canvas_id);
        this.gl = this.canvas.getContext("webgl");

        if (this.gl == null){alert("Unable to initialize WebGL for Canvas" + canvas_id); return;}

        this.gl.clearColor(0.0,0.0,0.0,1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.enable(this.gl.DEPTH_TEST);

        this.cam = new Camera(1);

    }
    makeBuffer(type,data){


        var tempBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(type, tempBuffer);
        this.gl.bufferData(type, data, this.gl.STATIC_DRAW);
        //this.gl.bindBuffer(type, null);
    
        return tempBuffer;

    }

    setup(some_setup_function){
        some_setup_function(this.context,this.gl,this.cam);
    }

    main_loop(some_function) {
        some_function(this.context,this.gl,this.cam);
    }

}

class Shader {
    constructor(fragment_code,vertex_code,context){
        this.context = context;
        /// Create the fragment shader from the supplied code
        this.fragment_shader = context.createShader(context.FRAGMENT_SHADER);
        context.shaderSource(this.fragment_shader, fragment_code);
        context.compileShader(this.fragment_shader);

        /// Create the vertex shader from the supplied code
        this.vertex_shader = context.createShader(context.VERTEX_SHADER);
        context.shaderSource(this.vertex_shader, vertex_code);
        context.compileShader(this.vertex_shader);

        /// Create the 'full' shader 
        this.program = context.createProgram();
        context.attachShader(this.program, this.vertex_shader);
        context.attachShader(this.program, this.fragment_shader);
        context.linkProgram(this.program);
    }
    
    /// Function to bind the vertex & index buffers
    bind(vertex_buffer,index_buffer) {
        this.context.useProgram(this.program);
        this.context.bindBuffer(this.context.ARRAY_BUFFER, vertex_buffer);
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, index_buffer); 
    }

    /// gets the location of any uniform variable in the current program
    get_uniform_location(variable) {
        return this.context.getUniformLocation(this.program,variable);
    }
    /// Sends data to a Mat4 variable
    uniMatrix4(location,data){
        this.context.uniformMatrix4fv(location,this.context.FALSE,data);
    }

}

class Camera {
    constructor(aspect) {

        this.projection = new Float32Array(16);
        this.view = new Float32Array(16);

        mat4.lookAt(this.view,[0,0,-8],[0,0,0],[0,1,0]);
        mat4.identity(this.projection);
        mat4.perspective(this.projection,3.14*60/180,aspect,0.1,1000.0);
        
    }

    bind_to_shader(shader) {
        this.loc1 = shader.get_uniform_location("projection");
        this.loc2 = shader.get_uniform_location("view");
    }

    upload(shader) {
        shader.uniMatrix4(this.loc1,this.projection);
        shader.uniMatrix4(this.loc2,this.view);
    }

    slight_rotate(shader,delta,mat_in=this.view) {
        mat4.rotate(this.view,mat_in,delta,[0,1,0]);
        this.upload(shader);
    }

}


class drawable_vector{
    constructor(position,velocity,color=[1,1,1]){
        this.pos = position;
        this.vel = velocity;
        this.color = color;
        this.s = 0.5;
    }

    lineAt(time){
        return [this.pos[0]+this.vel[0]*time,this.pos[1]+this.vel[1]*time,this.pos[2]+this.vel[2]*time];
    }

    pathAt(model,time){
        var identity = new Float32Array(16);
        mat4.identity(identity);
        //alignDefaultVector(identity,[Math.cos(time),-Math.sin(time),0.1]);
        mat4.translate(model,identity,this.lineAt(time));
        mat4.scale(model,model,[this.s,this.s,this.s]);
        alignDefaultVector(model,this.vel);
    }

    stats(){
        var model = new Float32Array(16);
        mat4.translate(model,identity,this.pos);
        alignDefaultVector(model,this.vel);
        mat4.scale(model,model,[this.s,this.s,this.s]);
        return model;
    }
}



/// Calculate the dot-product & cross-product to obtain to obtain the axis of rotation & the angle...
function alignVector(vector1, vector2) {
    
    var axis = new Float32Array(3);
    var dot = glMatrix.vec3.dot(vector1,vector2);
    var angle = Math.acos(dot/(glMatrix.vec3.length(vector1)*glMatrix.vec3.length(vector2)));
    glMatrix.vec3.cross(axis,vector1,vector2);
    glMatrix.vec3.normalize(axis,axis);
    return [axis,angle];
}

/// Only for rotating a known model matrix from the default position... i.e rotates primary basis vector to new vector.
/// Normlizes the input.
function alignDefaultVector(model,vector) {
    var test = [0,1,0];
    //var test2 = new Float32Array(16);
    glMatrix.mat4.translate(model,model,[0,-1,0]);
    //glMatrix.vec3.multiply(test,test,model);
    glMatrix.vec3.normalize(vector,vector);

    var vector_rotation = alignVector(test,vector);
    mat4.rotate(model,model,vector_rotation[1],vector_rotation[0]);
}




/// Returns the model matrix
function follow_path(model,time) {
    var identity = new Float32Array(16);
    mat4.identity(identity);
    //alignDefaultVector(identity,[Math.cos(time),-Math.sin(time),0.1]);
    mat4.translate(model,model,[2*Math.sin(time),0,2*Math.cos(time)]);
    alignDefaultVector(model,[Math.cos(time),0,-Math.sin(time)]);
}