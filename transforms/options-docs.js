// transforms/options-docs.js
const fs = require('fs');
const path = require('path');

module.exports = function optionsDocsTransform(config = {}) {
  let { options = {} } = config;
  const file = path.join(process.cwd(), 'index.js');
  const src = fs.readFileSync(file, 'utf8');

  // Extract the JSDoc block above module.exports
  const match = src.match(/\/\*\*([\s\S]*?)\*\//);
  if (!match) return '_No options found._';

  const block = match[1];

  // Extract lines starting with " *   -"
  const lines = block
    .split('\n')
    .map((l) => l.trim())
    .filter(
      (l) => l.startsWith('-') || l.startsWith('* -') || l.startsWith('*   -'),
    )
    .map((l) => l.replace(/^\*?\s*-\s*/, '')); // remove leading markers

  // Parse into objects
  const opts = lines.map((line) => {
    const [head, ...rest] = line.split(':');
    const desc = rest.join(':').trim();
    const [nameType] = head.split(')').map((s) => s.trim());
    const [name, typeRaw] = nameType.split('(');
    const type = typeRaw || '';
    const defMatch = desc.match(/Default:\s*([^\s]+)/i);
    const def = defMatch ? defMatch[1] : '';
    return {
      name: name.trim(),
      type,
      default: def,
      desc,
    };
  });

  // Sort alphabetically
  const sorted = opts.sort((a, b) => a.name.localeCompare(b.name));

  // Render Markdown table
  const header = `| Option | Type | Default | Description |
|--------|------|---------|-------------|`;
  const rows = sorted.map(
    (o) => `| \`${o.name}\` | ${o.type} | ${o.default} | ${o.desc} |`,
  );

  return [
    '| Option | Type | Default | Description |',
    '|--------|------|---------|-------------|',
    ...rows,
  ].join('\n');
};
