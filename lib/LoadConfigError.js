module.exports = class LoadConfigError extends Error {
  constructor(error, configPath) {
    super(error.message);

    this.name = 'RequireModuleError';

    const stack = error.stack.split('\n').slice(1);
    stack.unshift(this.toString());

    this.stack = stack.join('\n');
    this.meta = { configPath };
  }
};
