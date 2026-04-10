import React, { useRef, useEffect } from "react";
import "./Hero.css"; // Plain CSS

const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define MN min(resolution.x,resolution.y)
float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(in vec2 p){vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
float fbm(vec2 p){float t=0., a=1.; mat2 m=mat2(1.,-.5,.2,1.2); for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;} return t;}
float clouds(vec2 p){float d=1., t=0.;for(float i=0.; i<3.; i++){float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p); t=mix(t,d,a); d=a; p*=2./(i+1.); } return t;}
void main(){ 
  vec2 uv=(FC-0.5*resolution)/MN; vec3 col=vec3(0); 
  float bg=clouds(vec2(uv.x+time*0.5,-uv.y)); 
  uv*=1.-0.3*(sin(time*0.2)*0.5+0.5); 
  for(float i=1.; i<12.; i++){ 
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+time*0.5+.1*uv.x); 
    vec2 p=uv; 
    float d=length(p); 
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.); 
    float b=noise(i+p+bg*1.731); 
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y))); 
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d); 
  } 
  O=vec4(col,1.); 
}`;

const Hero = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
      }
      return shader;
    };

    const vsSource = `#version 300 es
    in vec4 position;
    void main(){ gl_Position=position; }`;
    const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(defaultShaderSource, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1,1, -1,-1, 1,1, 1,-1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, "resolution");
    const timeLoc = gl.getUniformLocation(program, "time");

    const render = (time) => {
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, time * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestRef.current = requestAnimationFrame(render);
    };
    render(0);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

<div className="hero-content">
  {/* Trust Badge / Social Proof */}
  
  <h1 className="hero-title">
    <span>Grow</span> <span>Your</span> <span>Brand</span>
  </h1>
  <h2 className="hero-subtitle">
    Designs That Sell
  </h2>
  <p className="hero-description">
    We craft visually stunning websites that not only look amazing but turn visitors into loyal customers.
  </p>
  <div className="hero-buttons">
    <button className="btn-primary">Start Your Project</button>
    <button className="btn-secondary">See Our Work</button>
  </div>
</div>
    </div>
  );
};

export default Hero;