const path = require('path');

const { extend } = require('../../lib/extend');
const loader = require('../../lib/index');

const config = require('../fixtures/extends/config-a');
const configFilters = require('../fixtures/extends/config-filters');
const configMulti = require('../fixtures/extends/config-multi');

const configPath = path.join(__dirname, '../fixtures/extends/config-a.js');
const configMultiPath = path.join(
  __dirname,
  '../fixtures/extends/config-multi.js'
);

describe('extends', () => {
  it(`should extend`, () =>
    extend(config).then((result) => {
      expect(result).toMatchSnapshot();
    }));

  it(`should extend, use filters`, () =>
    extend(configFilters).then((result) => {
      expect(result).toMatchSnapshot();
    }));

  it(`should extend, use default filters`, () => {
    configFilters.extends.filters.plugins = 'unknown';
    configFilters.extends.filters.rules = 'unknown';
    return extend(configFilters).then((result) => {
      expect(result).toMatchSnapshot();
    });
  });

  it(`should extend MultiCompilers`, () =>
    extend(configMulti).then((result) => {
      expect(result).toMatchSnapshot();
    }));

  it(`should load full`, () =>
    loader({ configPath }).then((result) => {
      expect(result.config).toMatchSnapshot();
    }));

  it(`should load and extend MultiCompilers`, () =>
    loader({ configPath: configMultiPath }).then((result) => {
      expect(result.config).toMatchSnapshot();
    }));
});
