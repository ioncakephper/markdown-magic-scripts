# 📦 markdown‑magic‑scripts

> An extension to create a dashboard for scripts defined in your project's package.json file, powered by markdown-magic.

## Table of Contents

<!-- doc-gen TOC -->
- [📖 Examples](#examples)
  - [Default (table)](#default-table)
  - [Grouped by Category (list with fenced blocks)](#grouped-by-category-list-with-fenced-blocks)
  - [Compact List](#compact-list)
- [🧩 Metadata](#metadata)
  - [`package.json` Example](#packagejson-example)
  - [Using a Custom Metadata Key](#using-a-custom-metadata-key)
- [🛠️ Providing Options to `markdown-magic-scripts`](#providing-options-to-markdown-magic-scripts)
  - [1. 📄 Inline Comment Markup](#1--inline-comment-markup)
  - [2. ⚙️ Via `markdown-magic.config.js`](#2--via-markdown-magicconfigjs)
- [Scripts Transformer Options](#scripts-transformer-options)
- [✅ Why Use This?](#why-use-this)
- [Directory Structure](#directory-structure)
- [Available Scripts](#available-scripts)
- [🤝 Contributing](#contributing)
  - [🧰 Setup](#setup)
  - [🧩 Adding New Scripts](#adding-new-scripts)
  - [🪄 Extending Transforms](#extending-transforms)
  - [✅ Pull Request Checklist](#pull-request-checklist)
- [📄 License](#license)
<!-- end-doc-gen -->

## 📖 Examples

### Default (table)

```html
<!-- DOCUMENTATION-CONTENT:START SCRIPTS -->
<!-- DOCUMENTATION-CONTENT:END -->
```

Produces:

| Script | Command              | Description   | Line                   |
| ------ | -------------------- | ------------- | ---------------------- |
| `lint` | `eslint .`           | Run ESLint    | [4](./package.json#L4) |
| `docs` | `npx markdown-magic` | Generate docs | [5](./package.json#L5) |

---

### Grouped by Category (list with fenced blocks)

```html
<!-- DOCUMENTATION-CONTENT:START SCRIPTS format=list groupBy=category -->
<!-- DOCUMENTATION-CONTENT:END -->
```

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

```html
<!-- DOCUMENTATION-CONTENT:START SCRIPTS format=list compact=true -->
<!-- DOCUMENTATION-CONTENT:END -->
```

Produces:

```markdown
- `lint`
- `docs`
- `build`
- `test`
```

---

## 🧩 Metadata

You can enrich your scripts with descriptions, categories, and other metadata by adding a `scriptsMeta` object to your `package.json`. This metadata is then used to generate a more detailed and organized script dashboard.

### `package.json` Example

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

### Using a Custom Metadata Key

If you prefer to use a different name for your metadata object instead of `scriptsMeta`, you can use the `metaKey` option in your `markdown-magic` comment.

For example, if you want to use a `myScriptsInfo` object:

**`package.json`:**

```json
{
  "scripts": {
    "lint": "eslint .",
    "docs": "npx markdown-magic"
  },
  "myScriptsInfo": {
    "lint": { "description": "Run ESLint", "category": "dev" },
    "docs": { "description": "Generate docs", "category": "docs" }
  }
}
```

**`README.md`:**

```html
<!-- DOCUMENTATION-CONTENT:START SCRIPTS metaKey=myScriptsInfo -->
<!-- DOCUMENTATION-CONTENT:END -->
```

---

## 🛠️ Providing Options to `markdown-magic-scripts`

You can configure the transform using inline comment markup or via `markdown-magic.config.js`.

### 1. 📄 Inline Comment Markup

Use the `doc-gen ... end-doc-gen` block with options passed as a JSON object inside the parentheses:

```html
<!-- DOCUMENTATION-CONTENT:START SCRIPTS format:table}) -->
<!-- DOCUMENTATION-CONTENT:END -->
```

This will run the specified scripts in order. You can also include a `separator` if your transform supports parsing string-based input.

### 2. ⚙️ Via `markdown-magic.config.js`

You can define global options for the transform like this:

```js
const scriptTransform = require('markdown-magic-scripts');

module.exports = {
  transforms: {
    SCRIPTS: scriptTransform,
  },
  options: {
    SCRIPTS: {
      format: 'table',
    },
  },
};
```

> 🧠 Note: Inline options passed in the comment block will override the config options. This allows for flexible, per-block customization while maintaining global defaults.

## Scripts Transformer Options

<!-- doc-gen OPTIONS -->
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
<!-- end-doc-gen -->

## ✅ Why Use This?

- Keeps your README **always in sync** with your scripts.
- Makes onboarding contributors easier.
- Scales well with large projects (grouping, compact mode, metadata).

## Directory Structure

<!-- doc-gen fileTree -->
```
└── markdown-magic-scripts/
    ├── tests/
    │   └── scriptsTransform.test.js
    ├── transforms/
    │   └── options-docs.js
    ├── .prettierrc.json
    ├── CHANGELOG.md
    ├── eslint.config.js
    ├── index.js
    ├── LICENSE
    ├── markdown-magic.config.js
    ├── package-lock.json
    ├── package.json
    └── README.md
```
<!-- end-doc-gen -->

## Available Scripts

<!-- doc-gen SCRIPTS -->
| Script | Command | Description | Category | Line |
| -------- | -------- | -------- | -------- | -------- |
| `docs` | `npx markdown-magic README.md --config ./markdown-magic.config.js` | Update automated documentation content in README.md |  | [65](./package.json#L65) |
| `fix` | `npm run lint:fix && npm run format && npm run format:package` | Run lint:fix and format scripts |  | [70](./package.json#L70) |
| `format` | `prettier --write .` | Format all source files |  | [68](./package.json#L68) |
| `format:package` | `prettier --write package.json` | Format package.json |  | [69](./package.json#L69) |
| `lint` | `eslint . --ext .js,.json,.yaml,.md` | Lint all source files |  | [66](./package.json#L66) |
| `lint:fix` | `eslint . --ext .js,.json,.yaml,.md --fix` | Fix linting issues |  | [67](./package.json#L67) |
| `test` | `jest` | Run tests | dev | [50](./package.json#L50) |
<!-- end-doc-gen -->

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

Copyright (c) 2025 Ion Gireada

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
