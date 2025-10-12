// markdown-magic.config.js
const path = require('path');

module.exports = {
  transforms: {
    DIR_TREE: require('markdown-magic-directory-tree'),
    SCRIPTS: require('./index.js'),

    // Generate the Available Options table by parsing JSDoc in index.js
    'OPTIONS-DOCS': require('./transforms/options-docs.js'),
  },

  // Optional: specify which files to process
  // If omitted, markdown-magic will look for README.md by default
  files: [path.join(__dirname, 'README.md')],
};
