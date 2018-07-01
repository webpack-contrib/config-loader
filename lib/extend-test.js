const path = require('path');
const { inspect } = require('util');

const merge = require('merge-options').bind({ concatArrays: true });

const load = require('../load');
const resolve = require('../resolve');

const startingConfig = require('../../test/fixtures/extends/config-a');

function regexEqual(reg, exp) {
  return (
    reg instanceof RegExp &&
    exp instanceof RegExp &&
    reg.source === exp.source &&
    reg.global === exp.global &&
    reg.ignoreCase === exp.ignoreCase &&
    reg.multiline === exp.multiline
  );
}

const loadExtends = (extent) => {
  let result;
  if (path.isAbsolute(extent)) {
    result = load({ allowMissing: true, configPath: extent });
  } else {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    result = { config: require(extent), configPath: extent };
  }

  // eslint-disable-next-line no-use-before-define
  return resolve(result).then(({ config }) => extend(config));
};

const filterRules = (config) => {
  const { rules } = config.module;
  if (!rules || !rules.length) {
    return rules;
  }

  return rules.reduce(
    (array, other) =>
      array.findIndex(
        (rule) => rule.test === other.test || regexEqual(rule.test, other.test)
      ) < 0
        ? [...array, other]
        : array,
    []
  );
};

// TODO: Enable this functionality once syntax for
// const filterPlugins = (config) => {
//   const { plugins } = config;
//   if (!plugins || !plugins.length) {
//     return plugins;
//   }
//
//   return plugins.reduce(
//     (array, other) =>
//       array.findIndex(
//         (plugin) => plugin.constructor.name === other.constructor.name
//       ) < 0
//         ? [...array, other]
//         : array,
//     []
//   );
// };

const filter = (config) => {
  /* eslint-disable no-param-reassign */
  if (config.module) {
    config.module.rules = filterRules(config);
  }

  return config;
};

const extend = (config) => {
  let { extends: configExtends } = config;

  if (configExtends) {
    configExtends = [].concat(configExtends);
    const result = configExtends.reduceRight(
      (prev, conf) =>
        loadExtends(conf).then((extent) =>
          prev.then((prevConfig) => filter(merge(extent, prevConfig)))
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
  log(result);
});
