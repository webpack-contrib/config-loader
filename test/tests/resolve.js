const path = require('path');

const snapshot = require('snap-shot-it');

const resolve = require('../../lib/resolve');

const types = ['array', 'function', 'function-promise', 'promise'];
// const invalidTypes = ['invalid-array', 'invalid-type'];
const argv = {};

describe('Resolve', () => {
  for (const type of types) {
    it(`should resolve type: ${type}`, () => {
      const configPath = path.join(
        __dirname,
        `../fixtures/types/${type}/webpack.config.js`
      );
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const mod = require(configPath);
      const config = resolve(mod, argv);

      snapshot(config);
    });
  }

  // for (const invalid of invalidTypes) {
  //   it(`should catch invalid type: ${invalid}`, () => {
  //
  //   });
  // }
});
