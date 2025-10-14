const fs = require('fs');
const path = require('path');

/**
 * markdown-magic-scripts
 * Generates a Markdown table or list of npm scripts from package.json.
 *
 * Options:
 *   - sort (boolean): whether to sort scripts alphabetically. Default: true
 *   - lineNumbers (boolean): show the line number where each script is defined. Default: true
 *   - linkLineNumbers (boolean): make line numbers clickable links. Default: true
 *   - baseUrl (string): base URL for line number links. Default: "./package.json"
 *                       Example: "https://github.com/user/repo/blob/main/package.json"
 *   - groupBy (string|null): group scripts by a metadata field (e.g. "category"). Default: null
 *   - metaKey (string): name of the metadata object in package.json. Default: "scriptsMeta"
 *   - format (string): output format: "table" (default) or "list"
 *   - compact (boolean): in list mode, only show script names. Default: false
 *   - showCommands (boolean): show or hide the command column/text. Default: true
 *   - commandBlock (boolean): in list mode, show commands in fenced code blocks (true) or inline (false).
 *                             Default: true
 *   - commandLang (string): language for fenced code blocks. Default: "bash"
 *
 * Usage in README.md:
 * <!-- AUTO-GENERATED-CONTENT:START (SCRIPTS) -->
 * <!-- AUTO-GENERATED-CONTENT:END -->
 *
 * With options:
 * <!-- AUTO-GENERATED-CONTENT:START (SCRIPTS:format=list groupBy=category) -->
 * <!-- AUTO-GENERATED-CONTENT:END -->
 */
module.exports = function scriptsTransform(content, options = {}, _config) {
  const pkgPath = path.join(process.cwd(), 'package.json');
  const pkgRaw = fs.readFileSync(pkgPath, 'utf8');
  const pkg = JSON.parse(pkgRaw);

  const scripts = pkg.scripts || {};
  if (!Object.keys(scripts).length) {
    return '_No npm scripts found in package.json._';
  }

  const {
    sort = true,
    lineNumbers = true,
    linkLineNumbers = true,
    baseUrl = './package.json',
    groupBy = null,
    metaKey = 'scriptsMeta',
    format = 'table',
    compact = false,
    showCommands = true,
    commandBlock = true,
    commandLang = 'bash',
  } = options;

  const scriptsMeta = pkg[metaKey] || {};

  let entries = Object.entries(scripts);
  if (sort) entries = entries.sort(([a], [b]) => a.localeCompare(b));

  const normalizeMeta = (meta) => {
    if (!meta) return {};
    if (typeof meta === 'string') return { description: meta.trim() };
    if (typeof meta === 'object') {
      const copy = {};
      for (const [k, v] of Object.entries(meta)) {
        if (typeof v === 'string') copy[k] = v.trim();
      }
      return copy;
    }
    return {};
  };

  const lines = pkgRaw.split(/\r?\n/);
  const scriptLineMap = {};
  lines.forEach((line, idx) => {
    const match = line.match(/"([^"]+)":\s*".*"/);
    if (match && scripts[match[1]]) {
      scriptLineMap[match[1]] = idx + 1;
    }
  });

  let grouped = { All: entries };
  if (groupBy) {
    grouped = {};
    for (const [name, cmd] of entries) {
      const meta = normalizeMeta(scriptsMeta[name]);
      const key = meta[groupBy] || 'Uncategorized';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push([name, cmd]);
    }
  }

  const allKeys = new Set();
  for (const name of Object.keys(scripts)) {
    const meta = normalizeMeta(scriptsMeta[name]);
    Object.keys(meta).forEach((k) => allKeys.add(k));
  }
  const metaKeys = Array.from(allKeys);

  const renderTable = (entries) => {
    const header = [
      'Script',
      ...(showCommands ? ['Command'] : []),
      ...metaKeys.map((k) => capitalize(k)),
      ...(lineNumbers ? ['Line'] : []),
    ];
    const divider = header.map(() => '--------');

    const rows = entries.map(([name, cmd]) => {
      const meta = normalizeMeta(scriptsMeta[name]);
      const cells = [
        `\`${name}\``,
        ...(showCommands ? [`\`${cmd}\``] : []),
        ...metaKeys.map((k) =>
          meta[k] ? meta[k].replace(/\r?\n/g, '<br>') : '',
        ),
      ];
      if (lineNumbers) {
        const line = scriptLineMap[name] || '';
        if (line && linkLineNumbers) {
          cells.push(`[${line}](${baseUrl}#L${line})`);
        } else {
          cells.push(line.toString());
        }
      }
      return `| ${cells.join(' | ')} |`;
    });

    return [
      `| ${header.join(' | ')} |`,
      `| ${divider.join(' | ')} |`,
      ...rows,
    ].join('\n');
  };

  // Render a group as bullet list
  const renderList = (entries) => {
    return entries
      .map(([name, cmd]) => {
        if (compact) {
          return `- \`${name}\``;
        }
        const meta = normalizeMeta(scriptsMeta[name]);
        const desc = meta.description ? ` — ${meta.description}` : '';
        const line = lineNumbers
          ? (() => {
              const ln = scriptLineMap[name] || '';
              if (!ln) return '';
              return linkLineNumbers
                ? ` (line [${ln}](${baseUrl}#L${ln}))`
                : ` (line ${ln})`;
            })()
          : '';

        if (showCommands) {
          if (commandBlock) {
            // Indent fenced block by two spaces so it nests under the bullet
            return `- \`${name}\`${desc}${line}\n\n  \`\`\`${commandLang}\n  ${cmd}\n  \`\`\``;
          } else {
            return `- \`${name}\`: \`${cmd}\`${desc}${line}`;
          }
        } else {
          return `- \`${name}\`${desc}${line}`;
        }
      })
      .join('\n\n');
  };

  const output = [];
  for (const [group, groupEntries] of Object.entries(grouped)) {
    if (groupBy) output.push(`### ${group}`);
    output.push(
      format === 'list' ? renderList(groupEntries) : renderTable(groupEntries),
    );
    output.push('');
  }

  return output.join('\n');
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
