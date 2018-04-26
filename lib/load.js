const chalk = require('chalk');
const mock = require('mock-require');
const resolvePath = require('resolve').sync;
const webpackLog = require('webpack-log');

const LoadConfigError = require('./LoadConfigError');
const RequireModuleError = require('./RequireModuleError');

module.exports = (options = {}) => {
  const altExtensions = [null, '.es6', '.flow', '.mjs', '.ts'];
  const cosmicOptions = {
    rcExtensions: true,
    sync: true,
  };
  const configPrefix = 'webpack';
  const cwd = process.cwd();
  const log = webpackLog({ name: 'config', id: 'webpack-config-loader' });
  const requires = [].concat(options.require).filter((r) => !!r);

  // eslint-disable-next-line no-param-reassign
  options = Object.assign({ cwd: process.cwd() }, options);

  for (const module of requires) {
    const modulePath = resolvePath(module, { basedir: cwd });

    log.info(chalk`Requiring the {cyan ${module}} module`);

    try {
      if (options.requireOptions) {
        const { requireOptions } = options;
        // eslint-disable-next-line import/no-dynamic-require, global-require
        require(modulePath)(requireOptions);
      } else {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        require(modulePath);
      }
    } catch (e) {
      log.error(chalk`An error ocurred while requiring: {grey ${module}}`);
      throw new RequireModuleError(e, module);
    }
  }

  mock('require-from-string', (...args) => {
    const [, path] = args;
    const resolved = resolvePath(path, { basedir: cwd });

    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(resolved);
  });

  // ensures that cosmiconfig is using our mock
  const cosmiconfig = mock.reRequire('cosmiconfig');
  let config = {};
  let configPath = '';

  for (const extension of altExtensions) {
    let js = `${configPrefix}.config.js`;

    if (extension) {
      js = `${configPrefix}.config${extension}`;
      log.info(chalk`Config not found, trying {grey ${js}}`);
    }

    const opts = Object.assign({}, cosmicOptions, { js });

    if (options.configPath) {
      opts.configPath = options.configPath;
    }

    const explorer = cosmiconfig(configPrefix, opts);

    try {
      ({ config, filepath: configPath } = explorer.load(options.cwd) || {});
    } catch (e) {
      // prettier-ignore
      log.error(chalk`An error ocurred while trying to load: {grey ${configPath || js}}
            Did you forget to specify a --require?`);
      throw new LoadConfigError(e, configPath);
    }

    if (config) {
      break;
    }
  }

  mock.stop('require-from-string');

  if (!configPath && !options.allowZero) {
    // prettier-ignore
    log.error(chalk`Unable to load a config from: {grey ${options.cwd}}`);
    const e = new Error(`Unable to load a config from: ${options.cwd}`);
    throw new LoadConfigError(e, configPath);
  } else {
    config = config || {};
    configPath = configPath || '';
  }

  const result = { config, configPath };

  return result;
};
