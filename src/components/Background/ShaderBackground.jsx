import { useEffect, useRef } from "react";
import "./ShaderBackground.css";

// The original Dev16 hero shader, now running behind the whole site.
const FRAGMENT_SHADER = `#version 300 es
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

const VERTEX_SHADER = `#version 300 es
in vec4 position;
void main(){ gl_Position=position; }`;

export default function ShaderBackground() {
  const canvasRef = useRef(null);
  const veilRef = useRef(null);

  // WebGL render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl2", { antialias: false });
    if (!gl) return; // CSS gradient on <body> acts as the fallback

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const compile = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
      }
      return shader;
    };

    const vs = compile(VERTEX_SHADER, gl.VERTEX_SHADER);
    const fs = compile(FRAGMENT_SHADER, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, "resolution");
    const timeLoc = gl.getUniformLocation(program, "time");

    const STILL_FRAME_TIME = 6;
    let frame = 0;

    const draw = (seconds) => {
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, seconds);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // Performance: the clouds are soft, so render at a reduced resolution and let the
    // browser upscale. Capped at ~320k pixels regardless of screen size or retina density.
    const MAX_PIXELS = 320_000;
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const scale = Math.min(0.6, Math.sqrt(MAX_PIXELS / (w * h)));
      canvas.width = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (reduceMotion) draw(STILL_FRAME_TIME);
    };

    // ~30fps is plenty for a slow-moving background and halves the GPU work
    const FRAME_MS = 1000 / 30;
    let last = 0;
    const loop = (ms) => {
      frame = requestAnimationFrame(loop);
      if (ms - last < FRAME_MS) return;
      last = ms;
      draw(ms * 0.001);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduceMotion) draw(STILL_FRAME_TIME);
    else frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  // Darken the background as you scroll so content sections stay readable
  useEffect(() => {
    const veil = veilRef.current;
    const onScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.85), 1);
      veil.style.opacity = String(0.1 + progress * 0.62);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="bg-canvas" />
      <div ref={veilRef} className="bg-veil" />
      <div className="bg-vignette" />
    </div>
  );
}
