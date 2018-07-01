const { join } = require('path');

module.exports = {
  name: 'batman',
  extends: join(__dirname, 'config-base.js'),
  module: {
    rules: [
      {
        test: /\*.json$/,
        use: [
          {
            loader: `val-loader`,
          },
        ],
      },
    ],
  },
};
