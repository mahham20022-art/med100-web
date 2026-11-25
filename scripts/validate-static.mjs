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
    ...source.matchAll(/(?:from\s*|import\s*\()\s*['"]([^'"]+)['"]/g),
  ];
  for (const match of imports) {
    const specifier = match[1];
    if (!specifier.startsWith('.')) continue;
    const target = path.resolve(path.dirname(file), specifier);
    if (!fs.existsSync(target)) failures.push(path.relative(root, file) + ' imports missing ' + specifier);
  }
}

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
  const ref = match[1];
  if (/^(?:[a-z]+:|#|\/\/)/i.test(ref)) continue;
  const clean = ref.split(/[?#]/)[0];
  if (clean && !fs.existsSync(path.resolve(root, clean))) {
    failures.push('index.html references missing asset: ' + ref);
  }
}

if (failures.length) {
  console.error('Static validation failed:');
  for (const failure of failures) console.error(' - ' + failure);
  process.exit(1);
}
console.log('Static validation passed: ' + jsFiles.length + ' JavaScript files and local index assets checked.');


// Validate the published MCQ bank used by topic practice and mock exams.
const { getQuestionBank } = await import('../js/data/questions.js');
const bank = getQuestionBank();
const questionKeys = new Set();
const bankErrors = [];
for (const question of bank) {
  const key = question.topicId + '/' + question.id;
  if (questionKeys.has(key)) bankErrors.push('Duplicate question id: ' + key);
  questionKeys.add(key);
  if (!question.stem || !Array.isArray(question.options) || question.options.length < 2) bankErrors.push('Invalid question structure: ' + key);
  if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct >= question.options.length) bankErrors.push('Invalid answer key: ' + key);
  if (!question.explanation || !question.system || !question.difficulty) bankErrors.push('Missing learning metadata: ' + key);
}
if (bank.length < 60) bankErrors.push('Question bank unexpectedly small: ' + bank.length);
if (bankErrors.length) {
  console.error('Question bank validation failed:');
  for (const error of bankErrors) console.error(' - ' + error);
  process.exit(1);
}
console.log('Question bank validation passed: ' + bank.length + ' questions; unique IDs, answer keys and learning metadata checked.');
