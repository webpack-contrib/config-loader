module.exports = (/* argv */) =>
  new Promise((resolve /* reject */) => {
    resolve({
      entry: 'function-promise',
      mode: 'development',
    });
  });
