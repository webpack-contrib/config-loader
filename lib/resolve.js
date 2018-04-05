const fromFunction = (config, argv) =>
  new Promise((resolve, reject) => {
    try {
      const result = config('development', argv);
      resolve(result.default || result);
    } catch (e) {
      reject(e);
    }
  });

const fromObject = (config) =>
  Promise.resolve(config).then((result) => result.default || result);

const fromPromise = (config) => {
  const result = config();

  return result.default || result;
};

const handlers = {
  function: fromFunction,
  object: fromObject,
  Promise: fromPromise,
};

module.exports = (config, argv) => {
  const promises = [];

  for (const conf of [].concat(config)) {
    const type = typeof conf;
    promises.push(handlers[type](conf, argv));
  }

  return Promise.all(promises);
};
