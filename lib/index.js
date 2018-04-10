const webpackLog = require('webpack-log');
const validate = require('@webpack-contrib/schema-utils');
const schema = require('webpack/schemas/WebpackOptions.json');

const load = require('./load');
const resolve = require('./resolve');

module.exports = (options = {}) => {
  webpackLog({ name: 'config', id: 'webpack-config-loader' });

  const name = 'config-loader';
  const raw = load(options);

  return resolve(raw).then((result) => {
    for (const target of [].concat(result.config)) {
      validate({ name, schema, target });
    }

    return result;
  });
};
