module.exports = (/* env*/) =>
  new Promise((resolve /* reject */) => {
    resolve({
      entry: 'function-promise',
      mode: 'development',
    });
  });
