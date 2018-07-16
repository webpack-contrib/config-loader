# Extending Configuration Files

This module supports extending webpack configuration files with
[ESLint-style](https://eslint.org/docs/user-guide/configuring#extending-configuration-files)
`extends` functionality. A configuration file can extend the properties and
collections from base configurations, and are filtered intelligently.

The extends property value is either:

- A `String` that specifies; a fully-qualified configuration path, or an NPM
module name, or `require` path.
- An `Array` of `String`. Each additional configuration extends the preceding
configurations in the array. Configurations are extended recursively so a base
configuration can also have an extends property.
- An `Object` containing a `configs` property, which matches the two previously
types, and a `filters` property, which contains an `Object` specifying filter
rules.

To demonstrate the concept, suppose we had the following bare-bones setup:

```js
// base.config.js
module.exports = {
  name: 'base',
  mode: 'development',
  plugins: [...]
}
```

```js
// webpack.config.js
module.exports = {
  extends: path.join(..., 'base-config.js'),
  name: 'dev'
}
```

The resulting configuration object will look like:

```js
// result
{
  name: 'dev',
  mode: 'development',
  plugins: [...]
}
```

Where `plugins` contains the plugins as defined in the `base.config.js` file.

## Multiple Extended Configurations

There might be situations where we just want to get crazy and extend multiple
base or nested configurations. In that situation, users need only specify them
in the order they should be applied. For example:

```js
// webpack.config.js
module.exports = {
  extends: [
    path.join(..., 'batcave.config.js'),
    path.join(..., 'wayne-tower.config.js'),
    ...
  ]
};
```

## Using a Shareable Configuration Package

A sharable configuration is an NPM package that exports a configuration object.
Make sure the package has been installed to a directory where `config-loader`
can `require` it.

To use a sharable configuration, simply set the `extends` property equal to the
name of the package. For example, suppose we have a sharable configuration named
`webpack-config-batcave`. Use of that configuration would look like:

```js
// webpack.config.js
module.exports = {
  extends: 'webpack-config-batman',
  ...
};
```

## Filtering Properties and Collections

Filters are applied to the end-result of an extends-tree, and are applied using
a defined set of rules. If you don't see a filtering rule you need, please
consider [contributing one](../.github/CONTRIBUTING.md). By default those rules are:

- `rules` → applies to `module.rules`, filtered by the `test` property,
duplicates removed.
- `plugins` → no filtering. All plugins from every configuration are
concatenated.

Along with the default filters, users may choose to apply alternative filters.
Filters are applied by setting the `extends` property to an `Object` like so:

```js
// webpack.config.js
module.exports = {
  extends: {
    configs: path.join(..., 'base-config.js'),
    filters: { plugins: 'constructor' },
  },
  name: 'dev',
}
```

Available filters include:

### `plugins`

Applied to `plugins`.

Rules:
- `'default'` → no filtering. All plugins from every configuration are
concatenated.
- `'constructor'` → filtered by the plugin `constructor.name` property, duplicates
removed.

### `rules`

Applied to `module.rules`.

Rules:
- `'default'` → filtered by the `test` property, duplicates removed.
- `'none'` → no filtering, allows all aggregated rules from all extended
configurations.

_Note: [Contributions](../.github/CONTRIBUTING.md) of, and suggestions for new
filters are welcome!_
