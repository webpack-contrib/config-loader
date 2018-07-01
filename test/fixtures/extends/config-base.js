const { DefinePlugin, NamedModulesPlugin } = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    client: ['./base/shared.js'],
    server: './app-entry.js',
  },
  mode: 'development',
  module: {
    parser: {
      amd: false,
      commonjs: true,
    },
    rules: [
      {
        test: /.css$/,
        resourceQuery: /inline/,
        use: 'url-loader',
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    new NamedModulesPlugin(),
  ],
};
