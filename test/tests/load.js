const assert = require('power-assert');
const snapshot = require('snap-shot-it');
const webpackLog = require('webpack-log');

const formats = {
  'common-js': null,
  es6: 'babel-register',
  flow: 'flow-remove-types/register',
  rc: null,
  typescript: 'ts-node/register',
  yml: null,
};

webpackLog({
  name: 'config',
  id: 'webpack-config-loader',
  level: 'silent',
});

const load = require('../../lib/load');

describe('Load', () => {
  for (const format of Object.keys(formats)) {
    it(`should config of type ${format}`, () => {
      const req = formats[format];
      const options = { cwd: `./test/fixtures/formats/${format}` };

      if (req) {
        options.require = req;

        if (format === 'es6') {
          options.requireOptions = {
            extensions: ['.es6'],
          };
        }
      }

      const result = load(options);

      snapshot(result.config);
    });
  }

  it('should throw error for config not found', () => {
    const failure = () => {
      load({}, { cwd: `./test/fixtures/formats/not-found` });
    };

    assert.throws(failure);
  });
});
