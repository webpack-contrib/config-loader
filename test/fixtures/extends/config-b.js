const { join } = require('path');

module.exports = {
  extends: [join(__dirname, 'config-c.js'), join(__dirname, 'config-d.js')],
};
