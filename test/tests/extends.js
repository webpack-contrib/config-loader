const path = require('path');

const { extend } = require('../../lib/extend');
const loader = require('../../lib/index');

const config = require('../fixtures/extends/config-a');
const configFilters = require('../fixtures/extends/config-filters');

const configPath = path.join(__dirname, '../fixtures/extends/config-a.js');

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

  // TODO: multicompiler

  it(`should load full`, () =>
    loader({ configPath }).then((result) => {
      expect(result.config).toMatchSnapshot();
    }));
});
