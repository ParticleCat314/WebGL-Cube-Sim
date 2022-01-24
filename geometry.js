var triangle_vertices = [
    -0.5,0.25,0.0,
    -0.5,-0.25,0.0,
    0.5,0.0,0.0, 
];
     


arrow_indices = [0,1,2,0,2,3]; 

var arrow_vertices = [
    0.5,0.5,0.0,
    0.5,-0.5,0.0,
    -0.5,-0.5,0.0,
    -0.5,0.5,0.0,

    0.0,0.0,0.5,
];
     


var cube_positions = [
    // Front face
    -1.0, -1.0,  1.0,
    1.0, -1.0,  1.0,
    1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
    1.0,  1.0, -1.0,
    1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
    1.0,  1.0,  1.0,
    1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
    1.0, -1.0, -1.0,
    1.0,  1.0, -1.0,
    1.0,  1.0,  1.0,
    1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
];


var cube_indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23   // left
];


const vertexNormals = [
    // Front
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,

    // Back
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,

    // Top
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,

    // Bottom
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,

    // Right
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,

    // Left
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0
  ];

var prvertices = [
    0.0,  2.0,  0.0, //0
   -0.5,  0.0, -0.5, //1
    0.5,  0.0, -0.5, //2
    0.5,  0.0,  0.5, //3
   -0.5,  0.0,  0.5 //4
];

let pindices = [
    0, 1, 2,
    0, 2, 3,
    0, 3, 4,
    0, 4, 1
];


var normals = [
    0.0,  2.0,  0.0, //0
    -0.5,  0.0, -0.5, //1
     0.5,  0.0, -0.5, //2
     0.5,  0.0,  0.5, //3
    -0.5,  0.0,  0.5 //4

]


var bounding_vertices = [
    -1.0,-1.0,-1.0,
    -1.0,1.0,-1.0,
    1.0,-1.0,-1.0,
    1.0,1.0,-1.0,

    -1.0,-1.0,1.0,
    -1.0,1.0,1.0,
    1.0,-1.0,1.0,
    1.0,1.0,1.0,

]

var bounding_indices = [
    0,1,2,3,0,2,1,3,
    4,5,6,7,4,6,5,7,
    0,4,1,5,2,6,3,7


]


function R3_Verts(some_function,resolution=50) {
    var R3_verticies = [];

    var gridx = 50;
    var gridy = 50;
    var step = 4/gridx;
    
    var R3_indices = [];
    
    for (var i = 0; i<gridx; i++){
        for (var j = 0; j<gridy; j++){
            var index_x = step*i - 4*0.5;
            var index_y = step*j - 4*0.5;
    
            R3_verticies.push(index_x);
            R3_verticies.push(index_y);
            R3_verticies.push(some_function(index_x,index_y));
    
        }
    }
    
    for (var i = 0; i<gridx-1; i++){
        for (var j = 0; j<gridy-1; j++){
    
            var v = gridx*i + j;
    
            R3_indices.push(v);
            R3_indices.push(v+1);
            R3_indices.push(v+gridx+1);
    
            R3_indices.push(v);
            R3_indices.push(v+gridx+1);
            R3_indices.push(v+gridx);
    
    
        }
    }

    return [R3_verticies,R3_indices];

}