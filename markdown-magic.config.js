// markdown-magic.config.js
const path = require('path');

module.exports = {
  transforms: {
    // SCRIPTS: (config = {}) => {
    //   const { options = {} } = config;
    //   return `${JSON.stringify(options)}`;
    // }
    SCRIPTS: require('./index'),

    // Generate the Available Options table by parsing JSDoc in index.js
    OPTIONS: require('./transforms/options-docs.js'),
  },

  // Optional: specify which files to process
  // If omitted, markdown-magic will look for README.md by default
  files: [path.join(__dirname, 'README.md')],
};
