# Extending Configuration Files

A configuration file can extend the set of enabled rules from base configurations.

The extends property value is either:

a string that specifies a configuration
an array of strings: each additional configuration extends the preceding configurations
ESLint extends configurations recursively so a base configuration can also have an extends property.

The rules property can do any of the following to extend (or override) the set of rules:

enable additional rules
change an inherited rule’s severity without changing its options:
Base config: "eqeqeq": ["error", "allow-null"]
Derived config: "eqeqeq": "warn"
Resulting actual config: "eqeqeq": ["warn", "allow-null"]
override options for rules from base configurations:
Base config: "quotes": ["error", "single", "avoid-escape"]
Derived config: "quotes": ["error", "single"]
Resulting actual config: "quotes": ["error", "single"]