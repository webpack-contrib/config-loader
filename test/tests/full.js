const path = require('path');

const loader = require('../../lib/index');

const types = ['array', 'function', 'function-promise', 'promise'];

describe('Full Process', () => {
  for (const type of types) {
    it(`should fully load config type: ${type}`, (done) => {
      const cwd = path.join(__dirname, `../fixtures/types/${type}`);

      const options = { cwd };

      loader(options).then((result) => {
        expect(result.config).toMatchSnapshot();
        done();
      });
    });
  }

  it(`should fully load a config from abs path`, (done) => {
    const configPath = path.join(
      __dirname,
      `../fixtures/types/function-promise/webpack.config.js`
    );

    const options = { configPath };

    loader(options).then((result) => {
      expect(result.config).toMatchSnapshot();
      done();
    });
  });
});
