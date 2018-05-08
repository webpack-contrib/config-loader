const { resolve } = require('path');

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

      expect(result.config).toMatchSnapshot();
    });
  }

  it('should throw error for config not found', () => {
    const failure = () => {
      load({}, { cwd: `./test/fixtures/formats/not-found` });
    };

    expect(failure).toThrow();
  });

  it('should not throw for config not found, but allowed', () => {
    const result = load({
      allowMissing: true,
      cwd: `./test/fixtures/formats/not-found`,
    });

    expect(result).toMatchSnapshot();
  });

  it('should throw error for a bad config', () => {
    const failure = () => {
      load({}, { cwd: `./test/fixtures/failures/bad-config` });
    };

    expect(failure).toThrow();
  });

  it('should throw error for a bad exact config', () => {
    const failure = () => {
      load(
        {},
        {
          configPath: resolve(
            `./test/fixtures/failures/bad-config/webpack.config.js`
          ),
        }
      );
    };

    expect(failure).toThrow();
  });
});
