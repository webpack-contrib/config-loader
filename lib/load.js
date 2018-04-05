const chalk = require('chalk');
const mock = require('mock-require');
const resolve = require('resolve').sync;
const webpackLog = require('webpack-log');

module.exports = (argv) => {
  const altExtensions = [null, '.es6', '.mjs', '.ts'];
  const cosmicOptions = {
    rcExtensions: true,
    sync: true,
  };
  const configPrefix = 'ts';
  const cwd = process.cwd();
  const log = webpackLog({ name: 'config', id: 'webpack-config-loader' });
  const requires = [].concat(argv.require);

  for (const module of requires) {
    const modulePath = resolve(module, { basedir: cwd });

    log.info(`Requiring the {cyan ${module}} module`);

    try {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      require(modulePath);
    } catch (e) {
      log.error(chalk`An error ocurred while requiring: {grey ${module}}`);
      log.error(e);
    }
  }

  mock('require-from-string', (...args) => {
    const [, path] = args;
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(resolve(path, { basedir: cwd }));
  });

  // ensures that cosmiconfig is using our mock
  const cosmiconfig = mock.reRequire('cosmiconfig');
  let config;
  let configPath;

  for (const extension of altExtensions) {
    let js;

    if (extension) {
      log.info(`Config not found, trying `);
      js = `${configPrefix}.config${extension}`;
    }

    const opts = Object.assign({}, cosmicOptions, { js });
    const explorer = cosmiconfig(configPrefix, opts);

    try {
      ({ config, filepath: configPath } = explorer.load() || {});
    } catch (e) {
      log.error(chalk`An error ocurred while trying to load: {grey ${configPath}}
              Did you forget to specify a --require?`);
      log.error(e);
    }

    if (config) {
      break;
    }
  }

  mock.stop('require-from-string');

  return { config, configPath };
};
