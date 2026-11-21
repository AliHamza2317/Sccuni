/**
 * Renders the hero "silk" shader to still images:
 * - src/components/home/silk-poster.webp — the hero's first frame (navy and emerald);
 * - src/components/site/silk-light.webp — the same folds mapped to light tones (white, mist blue,
 *   mint), used as soft corner accents in page headers and sections.
 *
 * The page shows this poster immediately, before JavaScript runs; the live WebGL canvas then
 * fades in on top. Both start from the same frame, so the switch is invisible.
 * Run this again whenever the shader, POSTER_ASPECT or POSTER_TIME changes.
 *
 * Needs Playwright with Chromium (not a project dependency):
 *   NODE_PATH="$(npm root -g)" node scripts/render-silk-poster.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "src/components/home/hero-background.tsx"), "utf8");

const aspect = Number(source.match(/export const POSTER_ASPECT = ([\d.]+);/)[1]);
const time = Number(source.match(/export const POSTER_TIME = ([\d.]+);/)[1]);
const vertex = source.match(/const VERTEX = `([\s\S]*?)`;/)[1];
const fragment = source.match(/const FRAGMENT = `([\s\S]*?)`;/)[1].replace("${POSTER_ASPECT.toFixed(2)}", aspect.toFixed(2));

const height = 1000;
const width = Math.round(height * aspect);

const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"] });
const page = await browser.newPage();
await page.setContent(`<canvas id="c" width="${width}" height="${height}"></canvas>`);
const dataUrl = await page.evaluate(
  ({ vertex, fragment, width, height, time }) => {
    const canvas = document.getElementById("c");
    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true, antialias: false });
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.viewport(0, 0, width, height);
    gl.uniform2f(gl.getUniformLocation(program, "uRes"), width, height);
    gl.uniform1f(gl.getUniformLocation(program, "uTime"), time);
    // Same resting state as the live component: cursor strength 0, so the mouse position does not matter.
    gl.uniform2f(gl.getUniformLocation(program, "uMouse"), 0.62, 0.65);
    gl.uniform1f(gl.getUniformLocation(program, "uStrength"), 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    const poster = canvas.toDataURL("image/webp", 0.95);

    // Light version: map each pixel's brightness onto a light colour ramp, keeping the folds.
    const c2 = document.createElement("canvas");
    c2.width = width;
    c2.height = height;
    const ctx = c2.getContext("2d");
    ctx.drawImage(canvas, 0, 0);
    const img = ctx.getImageData(0, 0, width, height);
    const px = img.data;
    const lum = new Float32Array(width * height);
    for (let i = 0; i < lum.length; i++) lum[i] = 0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2];
    const sorted = Float32Array.from(lum).sort();
    const lo = sorted[Math.floor(sorted.length * 0.02)];
    const hi = sorted[Math.floor(sorted.length * 0.995)];
    const stops = [
      [0.0, [247, 250, 252]],
      [0.4, [228, 238, 245]],
      [0.72, [196, 235, 222]],
      [1.0, [127, 214, 190]],
    ];
    for (let i = 0; i < lum.length; i++) {
      const t = Math.min(1, Math.max(0, (lum[i] - lo) / (hi - lo)));
      let k = 0;
      while (k < stops.length - 2 && t > stops[k + 1][0]) k++;
      const [t0, c0] = stops[k];
      const [t1, c1] = stops[k + 1];
      const f = (t - t0) / (t1 - t0);
      for (let ch = 0; ch < 3; ch++) px[i * 4 + ch] = Math.round(c0[ch] + (c1[ch] - c0[ch]) * f);
    }
    ctx.putImageData(img, 0, 0);
    return { poster, light: c2.toDataURL("image/webp", 0.92) };
  },
  { vertex, fragment, width, height, time },
);
await browser.close();

const out = join(root, "src/components/home/silk-poster.webp");
writeFileSync(out, Buffer.from(dataUrl.poster.split(",")[1], "base64"));
console.log(`Wrote ${out} (${width}×${height}, t=${time})`);
const outLight = join(root, "src/components/site/silk-light.webp");
writeFileSync(outLight, Buffer.from(dataUrl.light.split(",")[1], "base64"));
console.log(`Wrote ${outLight}`);
