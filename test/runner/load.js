/*
  This runner is needed as jest transforms calls to `require` in such a way that
  is not compatible with require hook modules.
*/
const minimist = require('minimist');
const webpackLog = require('webpack-log');

const load = require('../../lib/load');

const argv = minimist(process.argv.slice(2));

webpackLog({
  name: 'config',
  id: 'webpack-config-loader',
  level: 'silent',
});

const loadArgv = {};

if (argv.require) {
  loadArgv.require = argv.require;
}

const result = load(loadArgv, { cwd: argv.cwd });

// eslint-disable-next-line no-console
console.log(JSON.stringify(result, null, 2));
