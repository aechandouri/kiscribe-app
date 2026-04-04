// Script to generate PWA icons
// Run: node scripts/generate-icons.mjs
// Requires: npm install --save-dev sharp (temporary)

import { createCanvas } from "canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/icons");

fs.mkdirSync(outDir, { recursive: true });

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Background — vert sauge #5C7A5F
  ctx.fillStyle = "#5C7A5F";
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, size * 0.2);
  ctx.fill();

  // Letter "K" — white, centered
  ctx.fillStyle = "#FFFFFF";
  ctx.font = `bold ${size * 0.55}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("K", size / 2, size / 2 + size * 0.03);

  return canvas.toBuffer("image/png");
}

const sizes = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

for (const { name, size } of sizes) {
  const buf = drawIcon(size);
  fs.writeFileSync(path.join(outDir, name), buf);
  console.log(`Generated: public/icons/${name} (${size}x${size})`);
}

console.log("Icons generated successfully.");
