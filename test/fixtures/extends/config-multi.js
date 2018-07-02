const { join } = require('path');

const { DefinePlugin } = require('webpack');

module.exports = [
  {
    extends: {
      configs: [join(__dirname, 'config-b.js')],
      filters: { plugins: 'constructor' },
    },
    name: 'client',
    plugins: [
      new DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
    ],
  },
  {
    extends: join(__dirname, 'config-b.js'),
    name: 'server',
    plugins: [
      new DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
    ],
  },
];
