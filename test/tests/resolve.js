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

  it(`should resolve a function config and pass argv`, (done) => {
    const configPath = path.join(
      __dirname,
      `../fixtures/types/function-argv/webpack.config.js`
    );
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const config = require(configPath);
    resolve({ config, configPath }, { mode: 'batman' }).then((result) => {
      expect(result.config).toMatchSnapshot();
      done();
    });
  });

  /* NOTE: This test relies upon --mode=superman being part of the NPM script
     running the tests, as it examines the actual process.argv, since argv is
     not manually passed to resolve.
  */
  it(`should resolve a function config and parse argv`, (done) => {
    const configPath = path.join(
      __dirname,
      `../fixtures/types/function-argv/webpack.config.js`
    );
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const config = require(configPath);
    resolve({ config, configPath }).then((result) => {
      expect(result.config).toMatchSnapshot();
      done();
    });
  });
});
