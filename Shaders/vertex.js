var vertCode =
`precision mediump float; 
attribute vec3 coordinates;
attribute vec3 vertex_color;
attribute vec3 normals;

varying vec3 vcolor;
varying vec3 normal;
varying vec3 pos;

uniform mat4 normalMatrix;
uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform mat4 modelRotation;
uniform float time;

#define green vec3(0,1,0)
#define blue vec3(0,0,1)
#define red vec3(1,0,0)
#define orange vec3(1,0.5,0)
#define white vec3(1,1,1)
#define yellow vec3(1,1,0)

uniform float faces[6];

void main() {
    

    //vec3 directionalVector = vec3(0.5,0.5,0.5);
    //highp vec4 transformedNormal = normalMatrix * vec4(normals, 1.0);
    //highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);

    pos = vec3(model * vec4(coordinates,1.0));
    normal = mat3(normalMatrix)*normals;
    //vcolor = vertex_color;


    float s1 =  dot(normals,vec3(-1,0,0));
    float s2 =  dot(normals,vec3(1,0,0));

    float s3 =  dot(normals,vec3(0,-1,0));
    float s4 =  dot(normals,vec3(0,1,0));

    float s5 =  dot(normals,vec3(0,0,-1));
    float s6 =  dot(normals,vec3(0,0,1));

    if (0.5<s1) {vcolor = faces[0]*blue;}
    else if (0.5<s2) {vcolor = faces[1]*green;}
    else if (0.5<s3) {vcolor = faces[2]*red;}
    else if (0.5<s4) {vcolor = faces[3]*orange;}
    else if (0.5<s5) {vcolor = faces[4]*white;}
    else if (0.5<s6) {vcolor = faces[5]*yellow;}

    //vcolor = vertex_color;
    gl_Position = projection*view*modelRotation*model*vec4(coordinates.x+0.0*sin(time*coordinates.y),coordinates.y-0.0*sin(time*coordinates.x),coordinates.z, 1.0);
}`;
