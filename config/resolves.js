const path = require('path');

module.exports = {
  extensions: [".js", ".jsx"],
  alias: {
    '~': path.resolve(__dirname, '../src/js/'),
    'scss': path.resolve(__dirname, '../src/scss')
  }
};
