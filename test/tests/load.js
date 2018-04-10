const assert = require('power-assert');
const snapshot = require('snap-shot-it');
const webpackLog = require('webpack-log');

const formats = {
  'common-js': null,
  es6: 'babel-register',
  flow: 'flow-remove-types/register',
  typescript: 'ts-node/register',
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
      const argv = {};

      if (req) {
        argv.require = req;

        if (format === 'es6') {
          argv.requireOptions = JSON.stringify({
            extensions: ['.es6'],
          });
        }
      }

      const result = load(argv, { cwd: `./test/fixtures/formats/${format}` });

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
