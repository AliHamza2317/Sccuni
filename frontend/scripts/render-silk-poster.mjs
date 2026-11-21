/**
 * Renders the hero "silk" shader to a still image: src/components/home/silk-poster.webp.
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
    return canvas.toDataURL("image/webp", 0.95);
  },
  { vertex, fragment, width, height, time },
);
await browser.close();

const out = join(root, "src/components/home/silk-poster.webp");
writeFileSync(out, Buffer.from(dataUrl.split(",")[1], "base64"));
console.log(`Wrote ${out} (${width}×${height}, t=${time})`);
