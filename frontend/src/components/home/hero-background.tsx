"use client";

import { useEffect, useRef } from "react";

/* A full-screen triangle; the fragment shader paints every pixel. */
const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/*
 * Slow "aurora" of navy, emerald and a little blue, made from layered noise.
 * The cursor gently bends the light around it and adds a soft mint glow.
 * Colours come from the brand palette; brightness is kept low so white text stays readable.
 */
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uStrength;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = r * p * 2.02 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  float t = uTime * 0.035;

  vec2 d = p - m;
  float md = length(d);
  p += (d / (md + 0.0001)) * 0.07 * exp(-md * md * 5.0) * uStrength;

  vec2 q = vec2(fbm(p * 1.3 + vec2(0.0, t)), fbm(p * 1.3 + vec2(5.2, -t)));
  float n = fbm(p * 1.6 + 1.8 * q + vec2(t * 0.6, t * 0.2));

  vec3 deep = vec3(0.0, 0.035, 0.09);
  vec3 navy = vec3(0.0, 0.07, 0.165);
  vec3 emerald = vec3(0.0, 0.596, 0.486);
  vec3 mint = vec3(0.176, 0.729, 0.596);
  vec3 blue = vec3(0.172, 0.357, 0.847);

  vec3 col = mix(deep, navy, smoothstep(0.0, 1.0, uv.y));
  float aurora = smoothstep(0.45, 0.92, n);
  col = mix(col, emerald * 0.5, aurora * 0.5 * smoothstep(0.05, 1.0, uv.y));
  col += blue * 0.09 * smoothstep(0.5, 0.95, q.x) * (1.0 - uv.y * 0.5);

  vec2 s = (uv - vec2(0.5, 1.08)) * vec2(1.25, 2.4);
  col += emerald * 0.26 * exp(-dot(s, s) * 2.2);

  col += mint * 0.15 * exp(-md * md * 7.0) * uStrength;

  vec2 v = uv - 0.5;
  col *= 1.0 - 0.45 * dot(v, v);
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

/** Maximum pixels the shader paints per frame (about 700×640). */
const PIXEL_BUDGET = 450_000;

/** How far the grid layer extends past the hero on each side (matches `-inset-10`). */
const GRID_BLEED = 40;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Interactive hero background.
 * - WebGL aurora that drifts slowly and bends around the cursor.
 * - The line grid lights up near the cursor and shifts slightly (parallax).
 * - Falls back to the CSS layers when WebGL is unavailable.
 * - Static under prefers-reduced-motion; paused when off screen.
 */
export function HeroBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -1, y: -1, seen: false };
    const target = { x: 0.5, y: 0.3, s: 0 };
    const current = { x: 0.5, y: 0.3, s: 0 };

    // ── WebGL setup (optional) ──
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "low-power" });
    let program: WebGLProgram | null = null;
    let uRes: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uMouse: WebGLUniformLocation | null = null;
    let uStrength: WebGLUniformLocation | null = null;

    if (gl) {
      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
      if (vs && fs) {
        program = gl.createProgram();
        if (program) {
          gl.attachShader(program, vs);
          gl.attachShader(program, fs);
          gl.linkProgram(program);
          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) program = null;
        }
      }
      if (program) {
        gl.useProgram(program);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(program, "aPos");
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
        uRes = gl.getUniformLocation(program, "uRes");
        uTime = gl.getUniformLocation(program, "uTime");
        uMouse = gl.getUniformLocation(program, "uMouse");
        uStrength = gl.getUniformLocation(program, "uStrength");
      }
    }

    // Soft, low-resolution render: the image is smooth, so a reduced resolution looks the same and costs far less.
    // At most PIXEL_BUDGET pixels are shaded per frame, whatever the screen size.
    const resize = () => {
      if (!gl || !program) return;
      const rect = wrap.getBoundingClientRect();
      let scale = Math.min(window.devicePixelRatio || 1, 2) * 0.5;
      const pixels = rect.width * rect.height * scale * scale;
      if (pixels > PIXEL_BUDGET) scale *= Math.sqrt(PIXEL_BUDGET / pixels);
      canvas.width = Math.max(1, Math.round(rect.width * scale));
      canvas.height = Math.max(1, Math.round(rect.height * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.seen = true;
    };
    const onPointerLeave = () => {
      pointer.seen = false;
    };
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    const start = performance.now();
    let frameId = 0;
    let visible = true;

    const draw = (now: number) => {
      frameId = 0;

      if (pointer.seen) {
        const rect = wrap.getBoundingClientRect();
        const x = (pointer.x - rect.left) / rect.width;
        const y = (pointer.y - rect.top) / rect.height;
        const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
        if (inside) {
          target.x = x;
          target.y = y;
        }
        target.s = inside ? 1 : 0;
      } else {
        target.s = 0;
      }

      const ease = reduceMotion ? 1 : 0.07;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      current.s += (target.s - current.s) * ease;

      // Parallax offset of the grid, and the cursor position inside the (40px larger, shifted) grid layer.
      const px = (current.x - 0.5) * -28;
      const py = (current.y - 0.5) * -18;
      const gx = current.x * wrap.clientWidth + GRID_BLEED - px;
      const gy = current.y * wrap.clientHeight + GRID_BLEED - py;
      wrap.style.setProperty("--mx", `${(current.x * 100).toFixed(2)}%`);
      wrap.style.setProperty("--my", `${(current.y * 100).toFixed(2)}%`);
      wrap.style.setProperty("--ms", current.s.toFixed(3));
      wrap.style.setProperty("--px", `${px.toFixed(2)}px`);
      wrap.style.setProperty("--py", `${py.toFixed(2)}px`);
      wrap.style.setProperty("--gx", `${gx.toFixed(1)}px`);
      wrap.style.setProperty("--gy", `${gy.toFixed(1)}px`);

      if (gl && program) {
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, reduceMotion ? 12 : (now - start) / 1000);
        gl.uniform2f(uMouse, current.x, 1 - current.y);
        gl.uniform1f(uStrength, current.s);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        canvas.dataset.on = "1";
      }

      if (!reduceMotion && visible) frameId = requestAnimationFrame(draw);
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frameId && !reduceMotion) frameId = requestAnimationFrame(draw);
    });
    intersection.observe(wrap);
    frameId = requestAnimationFrame(draw);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      resizeObserver.disconnect();
      intersection.disconnect();
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* CSS fallback, visible until (or unless) WebGL starts */}
      <div className="absolute top-[-340px] left-1/2 h-[820px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(0_152_124/0.34),rgb(0_152_124/0.08)_55%,transparent)]" />
      <div className="animate-aurora absolute top-[160px] left-[-14%] size-[560px] rounded-full bg-[#2c5bd8]/[0.13] blur-[120px]" />
      <div className="animate-aurora absolute right-[-12%] bottom-[-160px] size-[520px] rounded-full bg-brand-500/[0.16] blur-[120px] [animation-delay:-9s]" />

      {/* WebGL aurora */}
      <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-0 transition-opacity duration-1000 data-[on=1]:opacity-100" />

      {/* Line grid with a little parallax; the same grid lights up around the cursor */}
      <div className="absolute -inset-10" style={{ transform: "translate3d(var(--px, 0px), var(--py, 0px), 0)" }}>
        <div className="bg-lines-dark mask-radial absolute inset-0" />
        <div
          className="bg-lines-bright absolute inset-0"
          style={{
            opacity: "var(--ms, 0)",
            maskImage: "radial-gradient(300px circle at var(--gx, 50%) var(--gy, 30%), #000 0%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(300px circle at var(--gx, 50%) var(--gy, 30%), #000 0%, transparent 72%)",
          }}
        />
      </div>

      {/* Soft spotlight that follows the cursor (also works without WebGL) */}
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--ms, 0)",
          background: "radial-gradient(520px circle at var(--mx, 50%) var(--my, 30%), rgb(45 186 152 / 0.10), transparent 60%)",
        }}
      />

      <div className="bg-noise absolute inset-0 opacity-[0.2] mix-blend-soft-light" />
    </div>
  );
}
