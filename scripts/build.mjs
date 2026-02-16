import { mkdirSync, cpSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const srcDir = join(root, "src");
// Use "docs" so GitHub Pages can serve from /docs on main
const outDir = join(root, "docs");

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function copyRecursive(from, to) {
  cpSync(from, to, { recursive: true });
}

function write404() {
  const indexPath = join(outDir, "index.html");
  const notFoundPath = join(outDir, "404.html");
  try {
    const indexHtml = readFileSync(indexPath, "utf8");
    writeFileSync(notFoundPath, indexHtml, "utf8");
  } catch {
    // if index is missing, ignore
  }
}

function main() {
  ensureDir(outDir);
  copyRecursive(srcDir, outDir);
  write404();
  console.log("Built static site to ./docs (for GitHub Pages)");
}

main();

