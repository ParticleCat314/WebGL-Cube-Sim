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
uniform float time;

void main() {
    

    //vec3 directionalVector = vec3(0.5,0.5,0.5);
    //highp vec4 transformedNormal = normalMatrix * vec4(normals, 1.0);
    //highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);

    pos = vec3(model * vec4(coordinates,1.0));
    normal = mat3(normalMatrix)*normals;
    vcolor = vertex_color;
    gl_Position = projection*view*model*vec4(coordinates.x,coordinates.y,coordinates.z, 1.0);
}`;
