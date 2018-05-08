require('loud-rejection/register');

global.expect = require('expect');

require('./snapshot');

require('./tests/load');
require('./tests/resolve');
require('./tests/full');
require('./tests/errors');
