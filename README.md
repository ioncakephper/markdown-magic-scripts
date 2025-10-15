# 📦 markdown‑magic‑scripts

> An extension to create a dashboard for scripts defined in your project's package.json file, powered by markdown-magic.

## Table of Contents

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Available Options](#available-options)
- [📖 Examples](#-examples)
  - [Default (table)](#default-table)
  - [Grouped by Category (list with fenced blocks)](#grouped-by-category-list-with-fenced-blocks)
  - [Compact List](#compact-list)
- [🧩 Metadata](#-metadata)
  - [`package.json` Example](#packagejson-example)
  - [Using a Custom Metadata Key](#using-a-custom-metadata-key)
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

## Features

This package provides a dedicated and powerful `markdown-magic` transform for documenting your `package.json` scripts, offering a significant upgrade over basic script documentation.

- **Flexible Output:** Generate a clean, easy-to-read table or a simple list of your scripts.
- **Grouping:** Organize your scripts by category using metadata from your `package.json`, making it easier to navigate and understand your project's workflow.
- **Sorting:** Automatically sort scripts alphabetically to maintain a consistent order.
- **Line Numbers:** Display and link to the exact line number where each script is defined in your `package.json`, making it easy to locate and edit scripts.
- **Command Display:** Choose to show or hide the full command for each script, allowing you to create a more compact or detailed view.
- **Compact Mode:** In list view, you can choose to display only the script names for a more concise output.
- **Highly Customizable:** With a wide range of options, you can tailor the output to perfectly match your project's documentation style.

## Installation

Install the package and its peer dependencies:

```bash
npm install markdown-magic markdown-magic-scripts --save-dev
```

## Usage

This package provides a `SCRIPTS` transform that you can use in your `markdown.config.js` file.

First, add the transform to your `markdown.config.js`:

```js
// markdown.config.js
module.exports {
  transforms: {
    SCRIPTS: require('markdown-magic-scripts'),
  },
};
```

Then, use the transform in your `README.md`:

<!-- AUTO-GENERATED-CONTENT:START (FILE:src=./samples/sample_magic_scripts.md) -->
<!-- The below content is automatically added from ./samples/sample_magic_scripts.md -->

```html
<!-- AUTO-GENERATED-CONTENT:START (SCRIPTS) -->
<!-- AUTO-GENERATED-CONTENT:END -->
```

<!-- AUTO-GENERATED-CONTENT:END -->

## Available Options

<!-- prettier-ignore-start -->
<!-- AUTO-GENERATED-CONTENT:START (OPTIONS-DOCS) -->
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
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- prettier-ignore-end -->

---

## 📖 Examples

### Default (table)

<!--AUTO-GENERATED-CONTENT:START (FILE:src=./samples/sample_magic_scripts.md)-->
<!-- The below content is automatically added from ./samples/sample_magic_scripts.md -->

```html
<!-- AUTO-GENERATED-CONTENT:START (SCRIPTS) -->
<!-- AUTO-GENERATED-CONTENT:END -->
```

<!--AUTO-GENERATED-CONTENT:END-->

Produces:

| Script | Command              | Description   | Line                   |
| ------ | -------------------- | ------------- | ---------------------- |
| `lint` | `eslint .`           | Run ESLint    | [4](./package.json#L4) |
| `docs` | `npx markdown-magic` | Generate docs | [5](./package.json#L5) |

---

### Grouped by Category (list with fenced blocks)

<!-- AUTO-GENERATED-CONTENT:START (FILE:src=./samples/sample_magic_scripts_with_list.md) -->
<!-- The below content is automatically added from ./samples/sample_magic_scripts_with_list.md -->

```html
<!-- AUTO-GENERATED-CONTENT:START (SCRIPTS:format=list&groupBy=category) -->
<!-- AUTO-GENERATED-CONTENT:END -->
```

<!-- AUTO-GENERATED-CONTENT:END -->

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
<!-- DOCUMENTATION_HEADER:START (SCRIPTS:format=list compact=true) -->
<!-- DOCUMENTATION_HEADER:END -->
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
<!-- DOCUMENTATION_HEADER:START (SCRIPTS:metaKey=myScriptsInfo) -->
<!-- DOCUMENTATION_HEADER:END -->
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
├─┬ samples/
│ ├── sample_magic_scripts_with_list.md
│ └── sample_magic_scripts.md
├─┬ tests/
│ └── scriptsTransform.test.js
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

| Script           | Command                                                        | Description                                         | Category | Line                     |
| ---------------- | -------------------------------------------------------------- | --------------------------------------------------- | -------- | ------------------------ |
| `docs`           | `md-magic`                                                     | Update automated documentation content in README.md |          | [57](./package.json#L57) |
| `fix`            | `npm run lint:fix && npm run format && npm run format:package` | Run lint:fix and format scripts                     |          | [62](./package.json#L62) |
| `format`         | `prettier --write .`                                           | Format all source files                             |          | [60](./package.json#L60) |
| `format:package` | `prettier --write package.json`                                | Format package.json                                 |          | [61](./package.json#L61) |
| `lint`           | `eslint . --ext .js,.json,.yaml,.md`                           | Lint all source files                               |          | [58](./package.json#L58) |
| `lint:fix`       | `eslint . --ext .js,.json,.yaml,.md --fix`                     | Fix linting issues                                  |          | [59](./package.json#L59) |
| `test`           | `jest`                                                         | Run tests                                           | dev      | [40](./package.json#L40) |

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
