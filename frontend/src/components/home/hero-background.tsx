"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import silkPoster from "./silk-poster.webp";

/**
 * Aspect ratio of the pre-rendered poster (`silk-poster.webp`). The shader crops to it like
 * object-fit: cover, so the canvas's first frame matches the poster pixel for pixel.
 * Regenerate the poster if the shader or this value changes (see frontend/README.md).
 */
export const POSTER_ASPECT = 1.7;

/** Time (seconds) of the poster frame; the animation starts from here. */
export const POSTER_TIME = 40;

/* A full-screen triangle; the fragment shader paints every pixel. */
const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/*
 * "Silk": a smooth height field of slow, folded waves, lit like satin.
 * - Large soft folds drift and change shape slowly.
 * - The light leans towards the cursor, and the cloth dips gently under it.
 * - Colours (from the logo): mostly emerald green, with deep navy only at the far edges and a
 *   faint mint sheen on the highlights.
 * Brightness is capped so white text on top keeps strong contrast.
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

float field(vec2 p, float t) {
  vec2 q = p;
  q += 0.42 * vec2(sin(q.y * 1.10 + t * 0.55), cos(q.x * 0.90 - t * 0.45));
  q += 0.20 * vec2(sin(q.y * 2.20 - t * 0.35 + 1.7), cos(q.x * 2.00 + t * 0.40 + 0.6));
  float h = sin(q.x * 1.15 + q.y * 0.85 + t * 0.25);
  h += 0.65 * sin(q.x * 0.55 - q.y * 1.50 - t * 0.18 + 2.0);
  vec2 c = q - vec2(0.4, -0.3);
  h += 0.22 * sin(dot(c, c) * 1.6 - t * 0.5);
  return h;
}

float height(vec2 p, vec2 m, float t) {
  vec2 d = p - m;
  return field(p, t) - 1.1 * exp(-dot(d, d) * 1.8) * uStrength;
}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

const float POSTER_ASPECT = ${POSTER_ASPECT.toFixed(2)};

/* Maps screen UV to the poster's UV the way CSS object-fit: cover does, so the first frame matches the poster image. */
vec2 coverUv(vec2 uv, float aspect) {
  if (aspect < POSTER_ASPECT) return vec2(0.5 + (uv.x - 0.5) * aspect / POSTER_ASPECT, uv.y);
  return vec2(uv.x, 0.5 + (uv.y - 0.5) * POSTER_ASPECT / aspect);
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 uv = coverUv(gl_FragCoord.xy / uRes, aspect);
  vec2 p = (uv - 0.5) * vec2(POSTER_ASPECT, 1.0) * 2.1;
  vec2 m = (coverUv(uMouse, aspect) - 0.5) * vec2(POSTER_ASPECT, 1.0) * 2.1;
  float t = uTime * 0.22;

  float e = 0.012;
  float h = height(p, m, t);
  float hx = height(p + vec2(e, 0.0), m, t);
  float hy = height(p + vec2(0.0, e), m, t);
  vec3 n = normalize(vec3((h - hx) / e, (h - hy) / e, 2.1));

  vec2 lean = (uMouse - 0.5) * 0.9 * uStrength;
  vec3 light = normalize(vec3(-0.30 + lean.x, 0.55 + lean.y, 0.80));
  float diff = clamp(dot(n, light), 0.0, 1.0);
  vec3 halfway = normalize(light + vec3(0.0, 0.0, 1.0));
  float spec = pow(clamp(dot(n, halfway), 0.0, 1.0), 36.0);

  // Mostly emerald green (the logo's green). Navy appears only at the far edges, so the middle
  // stays green and no dark patch drifts across the headline.
  vec2 ec = (uv - 0.5) * vec2(1.0, 1.25);
  float edge = smoothstep(0.30, 0.78, length(ec));
  vec3 shadow = mix(vec3(0.000, 0.150, 0.130), vec3(0.000, 0.045, 0.090), edge);
  vec3 base   = mix(vec3(0.000, 0.225, 0.185), vec3(0.000, 0.105, 0.150), edge);
  vec3 lit    = vec3(0.020, 0.345, 0.275);
  vec3 sheen  = vec3(0.500, 0.900, 0.780);

  vec3 col = mix(shadow, base, smoothstep(0.25, 0.58, diff));
  col = mix(col, lit, smoothstep(0.60, 0.95, diff));
  col += sheen * spec * 0.22;

  // Calm the very top (under the header) and the bottom (behind the product window).
  col *= mix(0.72, 1.0, smoothstep(1.0, 0.82, uv.y));
  col *= mix(0.80, 1.0, smoothstep(0.0, 0.25, uv.y));
  vec2 v = uv - 0.5;
  col *= 1.0 - 0.26 * dot(v, v);
  // A soft, wide shade behind the headline and search keeps text contrast high.
  vec2 tc = (uv - vec2(0.5, 0.64)) * vec2(1.1, 2.2);
  col *= 1.0 - 0.07 * exp(-dot(tc, tc) * 2.0);

  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

/** Maximum pixels the shader paints per frame (about 700×640). */
const PIXEL_BUDGET = 450_000;

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
 * Interactive "silk" hero background.
 * - WebGL satin folds that drift slowly; the light leans towards the cursor and the cloth dips under it.
 * - Shows a pre-rendered poster of the first frame straight away; falls back to it when WebGL is unavailable.
 * - Static under prefers-reduced-motion; paused when off screen or the tab is hidden.
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
    const target = { x: 0.62, y: 0.35, s: 0 };
    const current = { x: 0.62, y: 0.35, s: 0 };

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "low-power" });
    if (!gl) return;
    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = vs && fs ? gl.createProgram() : null;
    if (!program || !vs || !fs) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uStrength = gl.getUniformLocation(program, "uStrength");

    // The image is soft, so a reduced resolution looks the same and costs far less.
    const resize = () => {
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
      const ease = reduceMotion ? 1 : 0.05;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      current.s += (target.s - current.s) * ease;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      // Start part-way into the motion so the first frame already has nice folds.
      gl.uniform1f(uTime, POSTER_TIME + (reduceMotion ? 0 : (now - start) / 1000));
      gl.uniform2f(uMouse, current.x, 1 - current.y);
      gl.uniform1f(uStrength, current.s);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.dataset.on = "1";

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
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/*
        The first frame of the silk as a still image, fetched with high priority and with an inline
        blurred placeholder, so the silk is visible at once — before any JavaScript runs.
        It also stays as the background if WebGL is unavailable.
      */}
      {/* Served as-is (unoptimized): re-encoding would shift its colours away from the canvas's first frame. */}
      <Image src={silkPoster} alt="" fill unoptimized loading="eager" fetchPriority="high" placeholder="blur" className="object-cover object-center" />
      {/* The live canvas starts on exactly the same frame, so fading it in is invisible. */}
      <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-0 transition-opacity duration-500 data-[on=1]:opacity-100" />
    </div>
  );
}
