const { join } = require('path');

const { DefinePlugin } = require('webpack');

module.exports = {
  extends: {
    configs: [join(__dirname, 'config-b.js')],
    filters: { plugins: 'constructor' },
  },
  devtool: 'cheap-eval-source-map',
  entry: {
    client: ['./app-entry.js'],
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /target-file.js$/,
        use: [
          {
            loader: `val-loader`,
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
  ],
};
