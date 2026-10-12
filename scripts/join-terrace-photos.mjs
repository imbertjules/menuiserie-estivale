import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const partsRoot = join(root, "image-parts");
const outDir = join(root, "public", "realisations");
mkdirSync(outDir, { recursive: true });

for (const name of readdirSync(partsRoot)) {
  const dir = join(partsRoot, name);
  const parts = readdirSync(dir).sort();
  const bytes = Buffer.concat(parts.map((part) => readFileSync(join(dir, part))));
  writeFileSync(join(outDir, name), bytes);
}
