import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const jsFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith('.js')) jsFiles.push(full);
  }
}
walk(path.join(root, 'js'));

for (const file of jsFiles) {
  const source = fs.readFileSync(file, 'utf8');
  const imports = [
    ...source.matchAll(/(?:from\\s*|import\\s*\\()\\s*['"]([^'"]+)['"]/g),
  ];
  for (const match of imports) {
    const specifier = match[1];
    if (!specifier.startsWith('.')) continue;
    const target = path.resolve(path.dirname(file), specifier);
    if (!fs.existsSync(target)) failures.push(`${path.relative(root, file)} imports missing ${specifier}`);
  }
}

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
  const ref = match[1];
  if (/^(?:[a-z]+:|#|\\/\\/)/i.test(ref)) continue;
  const clean = ref.split(/[?#]/)[0];
  if (clean && !fs.existsSync(path.resolve(root, clean))) {
    failures.push(`index.html references missing asset: ${ref}`);
  }
}

if (failures.length) {
  console.error('Static validation failed:');
  for (const failure of failures) console.error(' - ' + failure);
  process.exit(1);
}
console.log(`Static validation passed: ${jsFiles.length} JavaScript files and local index assets checked.`);
