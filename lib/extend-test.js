const path = require('path');

const isPlainObj = require('is-plain-obj');
const merge = require('merge-options').bind({ concatArrays: true });

const startingConfig = require('../test/fixtures/extends/config-a');

const load = require('./load');
const resolve = require('./resolve');
const pluginFilters = require('./filters/plugins');
const ruleFilters = require('./filters/rules');

const loadExtends = (extent, options) => {
  let result;
  if (path.isAbsolute(extent)) {
    result = load({ allowMissing: true, configPath: extent });
  } else {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    result = { config: require(extent), configPath: extent };
  }

  // eslint-disable-next-line no-use-before-define
  return resolve(result).then(({ config }) => extend(config, options));
};

const filterPlugins = (config, options = {}) => {
  const filterName = options.plugins || 'default';
  const filter = pluginFilters[filterName] || pluginFilters.default;

  return filter(config);
};

const filterRules = (config, options = {}) => {
  const filterName = options.rules || 'default';
  const filter = ruleFilters[filterName] || ruleFilters.default;

  return filter(config);
};

const filterModule = (config) => {
  const { module } = config;
  if (module) {
    module.rules = filterRules(config);
  }

  return module;
};

const filter = (config, options) => {
  /* eslint-disable no-param-reassign */
  config.module = filterModule(config, options);
  config.plugins = filterPlugins(config, options);

  return config;
};

const extend = (config, options = {}) => {
  let { extends: configExtends } = config;

  if (configExtends) {
    if (isPlainObj(configExtends)) {
      // eslint-disable-next-line no-param-reassign
      options = configExtends.filters;
      configExtends = configExtends.configs;
    }

    configExtends = [].concat(configExtends);

    const result = configExtends.reduceRight(
      (prev, conf) =>
        loadExtends(conf, options).then((extent) =>
          prev.then((prevConfig) => filter(merge(extent, prevConfig), options))
        ),
      Promise.resolve(config)
    );

    return result;
  }

  return Promise.resolve(config);
};

extend(startingConfig).then((result) => {
  const { log } = console;
  delete result.extends;
  log(result.plugins);
});
