const path = require('path');

const resolve = require('../../lib/resolve');

const types = ['array', 'function', 'function-promise', 'promise'];
const argv = {};

describe('Resolve', () => {
  for (const type of types) {
    it(`should resolve type: ${type}`, (done) => {
      const configPath = path.join(
        __dirname,
        `../fixtures/types/${type}/webpack.config.js`
      );
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const config = require(configPath);
      resolve({ config, configPath }, argv).then((result) => {
        expect(result.config).toMatchSnapshot();
        done();
      });
    });
  }
});
