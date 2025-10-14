# 📦 markdown‑magic‑scripts

> An extension to create a dashboard for scripts defined in your project's package.json file, powered by markdown-magic.

## Table of Contents

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [📦 markdown‑magic‑scripts](#-markdownmagicscripts)
  - [Table of Contents](#table-of-contents)
  - [Available Options](#available-options)
  - [📖 Examples](#-examples)
    - [Default (table)](#default-table)
    - [Grouped by Category (list with fenced blocks)](#grouped-by-category-list-with-fenced-blocks)
    - [Compact List](#compact-list)
  - [🧩 Metadata](#-metadata)
  - [✅ Why Use This?](#-why-use-this)
  - [Directory Structure](#directory-structure)
  - [Available Scripts](#available-scripts)
  - [🤝 Contributing](#-contributing)
    - [🧰 Setup](#-setup)
    - [🧩 Adding New Scripts](#-adding-new-scripts)
    - [🪄 Extending Transforms](#-extending-transforms)
    - [✅ Pull Request Checklist](#-pull-request-checklist)
  - [📄 License](#-license)
<!-- AUTO-GENERATED-CONTENT:END -->


## Available Options

<!-- AUTO-GENERATED-CONTENT:START (OPTIONS-DOCS) -->
<!-- prettier-ignore-start -->
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseUrl` | string | "./package.json" | base URL for line number links. Default: "./package.json" |
| `commandBlock` | boolean |  | in list mode, show commands in fenced code blocks (true) or inline (false). |
| `commandLang` | string | "bash" | language for fenced code blocks. Default: "bash" |
| `compact` | boolean | false | in list mode, only show script names. Default: false |
| `format` | string |  | output format: "table" (default) or "list" |
| `groupBy` | string|null | null | group scripts by a metadata field (e.g. "category"). Default: null |
| `lineNumbers` | boolean | true | show the line number where each script is defined. Default: true |
| `linkLineNumbers` | boolean | true | make line numbers clickable links. Default: true |
| `metaKey` | string | "scriptsMeta" | name of the metadata object in package.json. Default: "scriptsMeta" |
| `showCommands` | boolean | true | show or hide the command column/text. Default: true |
| `sort` | boolean | true | whether to sort scripts alphabetically. Default: true |
<!-- prettier-ignore-end -->
<!-- AUTO-GENERATED-CONTENT:END -->

---

## 📖 Examples

### Default (table)

````html
<!-- AUTO-GENERATED-CONTENT:START (SCRIPTS) -->
<!-- AUTO-GENERATED-CONTENT:END -->
````

Produces:

| Script | Command              | Description   | Line                   |
| ------ | -------------------- | ------------- | ---------------------- |
| `lint` | `eslint .`           | Run ESLint    | [4](./package.json#L4) |
| `docs` | `npx markdown-magic` | Generate docs | [5](./package.json#L5) |

---

### Grouped by Category (list with fenced blocks)

````html
<!-- AUTO-GENERATED-CONTENT:START (SCRIPTS:format=list groupBy=category) -->
<!-- AUTO-GENERATED-CONTENT:END -->
````

Produces:

````markdown
### dev

- `lint` — Run ESLint on the codebase (line [4](./package.json#L4))

  ```bash
  eslint .
  ```

### docs

- `docs` — Generate docs (line [5](./package.json#L5))

  ```bash
  npx markdown-magic
  ```
````

### Compact List

````html
<!-- AUTO-GENERATED-CONTENT:START (SCRIPTS:format=list compact=true) -->
<!-- AUTO-GENERATED-CONTENT:END -->
````

Produces:

````markdown

- `lint`
- `docs`
- `build`
- `test`

````

---

## 🧩 Metadata

You can enrich scripts with metadata in `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "docs": "npx markdown-magic"
  },
  "scriptsMeta": {
    "lint": { "description": "Run ESLint", "category": "dev" },
    "docs": { "description": "Generate docs", "category": "docs" }
  }
}
```

---

## ✅ Why Use This?

- Keeps your README **always in sync** with your scripts.
- Makes onboarding contributors easier.
- Scales well with large projects (grouping, compact mode, metadata).

## Directory Structure

<!-- AUTO-GENERATED-CONTENT:START (DIR_TREE) -->
```
markdown-magic-scripts/
├─┬ .github/
│ └─┬ workflows/
│   └── release-please.yml
├── .qodo/
├─┬ transforms/
│ └── options-docs.js
├── .npmcheckrc
├── .prettierrc.json
├── CHANGELOG.md
├── eslint.config.js
├── index.js
├── LICENSE
├── markdown.config.js
├── package-lock.json
├── package.json
└── README.md
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Available Scripts

<!-- AUTO-GENERATED-CONTENT:START (SCRIPTS) -->
| Script | Command | Description | Line |
| -------- | -------- | -------- | -------- |
| `docs` | `md-magic` | Update automated documentation content in README.md | [46](./package.json#L46) |
| `fix` | `npm run lint:fix && npm run format && npm run format:package` | Run lint:fix and format scripts | [51](./package.json#L51) |
| `format` | `prettier --write .` | Format all source files | [49](./package.json#L49) |
| `format:package` | `prettier --write package.json` | Format package.json | [50](./package.json#L50) |
| `lint` | `eslint . --ext .js,.json,.yaml,.md` | Lint all source files | [47](./package.json#L47) |
| `lint:fix` | `eslint . --ext .js,.json,.yaml,.md --fix` | Fix linting issues | [48](./package.json#L48) |
| `test` | `echo "Error: no test specified" && exit 1` | Run tests | [52](./package.json#L52) |

<!-- AUTO-GENERATED-CONTENT:END -->

## 🤝 Contributing

Thanks for your interest in contributing! This project values clarity, maintainability, and contributor experience. Here’s how to get started:

### 🧰 Setup

1. Clone the repo and run `npm install`
2. Use `npm run lint`, `npm run format`, and `npm test` before submitting changes
3. Regenerate the README with `npx markdown-magic`

### 🧩 Adding New Scripts

If you add a new npm script:

- Define it in `package.json > scripts`
- Add metadata in `scriptsMeta` (description, category, tags)
- Run `npx markdown-magic` to update the README

### 🪄 Extending Transforms

Transforms live in `/transforms`. You can:

- Add new ones for other sections (e.g. options, CLI usage)
- Reuse metadata from JSDoc blocks or config files
- Use `prettier-ignore` to protect generated Markdown

### ✅ Pull Request Checklist

- [ ] Code is linted and formatted
- [ ] README is regenerated
- [ ] New scripts have metadata
- [ ] Changes are documented

---

## 📄 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2025 Ion

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
