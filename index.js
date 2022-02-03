// Set options as a parameter, environment variable, or rc file.
require = require('esm')(module, {
  sourceMap: true,
})
module.exports = require('./cli.js')
