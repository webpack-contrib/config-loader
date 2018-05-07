const RequireModuleError = require('../../lib/RequireModuleError');

describe('RequireModuleError', () => {
  it(`should construct an error`, () => {
    const base = new Error('message');
    const error = new RequireModuleError(base, 'test');

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('RequireModuleError');
    expect(error.stack).toContain('errors.js');
    expect(error.meta.moduleName).toBe('test');
  });
});
