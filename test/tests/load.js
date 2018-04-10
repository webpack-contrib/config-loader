const execa = require('execa');

const types = {
  'common-js': null,
  es6: 'babel-register',
  flow: 'flow-remove-types/register',
  typescript: 'ts-node/register',
};

describe('Load', () => {
  for (const type of Object.keys(types)) {
    test(`should config of type ${type}`, () => {
      const args = [
        './test/runner/load.js',
        `--cwd=./test/fixtures/formats/${type}`,
      ];

      if (types[type]) {
        args.push(`--require=${types[type]}`);
      }

      const { stdout } = execa.sync('node', args);

      const result = JSON.parse(stdout);

      expect(result.config).toMatchSnapshot();
    });
  }

  // test('should throw error', () => {
  //   expect(doit).toThrowError();
  //   expect(doit).toThrowErrorMatchingSnapshot();
  // });
  // test('should have errors for every option key', () => {
  //     expect(errors).toMatchObject(expected);
  //     expect(err.meta.errors).toMatchSnapshot();
  //   }
  // });
});
