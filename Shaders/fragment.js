var fragCode = `
precision highp float;

uniform vec3 camPos;
uniform vec3 color;
varying vec3 vcolor;
varying vec3 normal;
varying vec3 pos;

vec3 lightColor = vec3(0.5);
vec3 lightPos = vec3(0.0,0.0,5.0);
vec3 objectColor = vec3(1.0,1.0,1.0);
vec3 ambient = vec3(0.5);

float specStrength = 0.5;

void main() {
    if (color == vec3(0,0,0)){
        vec3 norm = normalize(normal);
        vec3 lightDir = normalize(lightPos-pos);
        float diff = max(dot(norm, lightDir), 0.0);

        vec3 viewDir = normalize(camPos - pos);
        vec3 reflectDir = reflect(-lightDir,norm);
        float spec = pow(max(dot(viewDir,reflectDir),0.0),32.0);
        vec3 specular = specStrength * spec * lightColor;
        
        vec3 diffuse = diff * lightColor;
        vec3 result = (ambient + diffuse + specular) * vcolor;
        gl_FragColor = vec4(result,1.0);
    }
    else {
        gl_FragColor = vec4(vcolor,1.0);
    }
}`;