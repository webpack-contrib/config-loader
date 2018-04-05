const minimist = require('minimist');
const webpackLog = require('webpack-log');

const load = require('./load');
const resolve = require('./resolve');

module.exports = () => {
  webpackLog({ name: 'config', id: 'webpack-config-loader' });

  const argv = minimist(process.argv.slice(2));
  const config = load(argv);

  return resolve(config);
};
