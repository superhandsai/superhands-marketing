const fs = require('fs');
const path = require('path');

const rootDir = process.argv[2];
if (!rootDir) { console.error('[sh-diff] No root dir'); process.exit(1); }

const manifestPath = path.join(rootDir, '.superhands-diff-manifest.json');
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch (e) {
  console.log('[sh-diff] No manifest found — skipping');
  process.exit(0);
}

// JSX opening tag: < preceded by non-word char (or start of line), then a letter.
// The lookbehind excludes TypeScript generics like useRef<HTMLDivElement>.
const JSX_TAG_RE = /(?<![A-Za-z0-9_])(<[A-Za-z][A-Za-z0-9.]*)/g;

// Check if a match position is inside a string literal or comment.
// Simple heuristic: count unescaped quotes before the match position.
function isInsideString(line, idx) {
  let inSingle = false, inDouble = false, inTemplate = false;
  for (let i = 0; i < idx; i++) {
    const ch = line[i];
    const prev = i > 0 ? line[i - 1] : '';
    if (prev === '\\') continue;
    if (ch === "'" && !inDouble && !inTemplate) inSingle = !inSingle;
    else if (ch === '"' && !inSingle && !inTemplate) inDouble = !inDouble;
    else if (ch === '`' && !inSingle && !inDouble) inTemplate = !inTemplate;
  }
  return inSingle || inDouble || inTemplate;
}

// Check if line is a comment
function isComment(line) {
  const trimmed = line.trim();
  return trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*');
}

let totalInjected = 0;

for (const [relFile, entries] of Object.entries(manifest)) {
  const filePath = path.join(rootDir, relFile);
  if (!fs.existsSync(filePath)) {
    console.log('[sh-diff] File not found:', relFile);
    continue;
  }

  const lines = fs.readFileSync(filePath, 'utf8').split('\n');

  // Sort entries by lineStart descending so we process bottom-up
  const sorted = [...entries].sort((a, b) => b.lineStart - a.lineStart);
  const injected = new Set();

  for (const entry of sorted) {
    if (injected.has(entry.id)) continue;

    // Search for first real JSX tag. Try forward within the range first,
    // then look up to 15 lines backward (the changed line might be text
    // content or a continuation attribute — the opening tag is above).
    let found = false;
    const forwardEnd = Math.min(entry.lineEnd, lines.length);
    const backwardStart = Math.max(0, entry.lineStart - 1 - 15);

    // Build search order: forward from lineStart, then backward
    const searchIndices = [];
    for (let i = entry.lineStart - 1; i < forwardEnd; i++) searchIndices.push(i);
    for (let i = entry.lineStart - 2; i >= backwardStart; i--) searchIndices.push(i);

    for (const i of searchIndices) {
      const line = lines[i];
      if (isComment(line)) continue;

      JSX_TAG_RE.lastIndex = 0;
      let match;
      while ((match = JSX_TAG_RE.exec(line)) !== null) {
        // Skip matches inside string literals
        if (isInsideString(line, match.index)) continue;

        const tagEnd = match.index + match[0].length;
        const attr = ' data-sh-diff="' + entry.id + '"';
        lines[i] = line.slice(0, tagEnd) + attr + line.slice(tagEnd);
        injected.add(entry.id);
        totalInjected++;
        found = true;
        console.log('[sh-diff] Injected', entry.id, 'at', relFile + ':' + (i + 1));
        break;
      }
      if (found) break;
    }
    if (!found) {
      console.log('[sh-diff] No JSX tag found for', entry.id, 'in', relFile, 'lines', entry.lineStart + '-' + entry.lineEnd);
    }
  }

  if (injected.size > 0) {
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log('[sh-diff] Wrote', injected.size, 'attributes to', relFile);
  }
}

console.log('[sh-diff] Done. Injected', totalInjected, 'data-sh-diff attributes.');
