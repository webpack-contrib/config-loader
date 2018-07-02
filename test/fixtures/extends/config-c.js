module.exports = {
  name: 'batman',
  module: {
    rules: [
      {
        test: /\*.json$/,
        use: [
          {
            loader: `json-loader`,
          },
        ],
      },
    ],
  },
};
