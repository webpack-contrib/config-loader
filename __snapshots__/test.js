exports['Load should config of type common-js 1'] = {
  "mode": "common-js"
}

exports['Load should config of type es6 1'] = {
  "default": {
    "mode": "es6"
  }
}

exports['Load should config of type flow 1'] = {
  "mode": "flow"
}

exports['Load should config of type rc 1'] = {
  "mode": "rc"
}

exports['Load should config of type typescript 1'] = {
  "default": {
    "mode": "typescript"
  }
}

exports['Load should config of type yml 1'] = {
  "mode": "yml"
}

exports['Resolve should resolve type: array 1'] = [
  {
    "entry": "./entry-a",
    "output": {
      "filename": "entry-a.bundle.js"
    }
  },
  {
    "entry": "./entry-b",
    "output": {
      "filename": "entry-b.bundle.js"
    }
  }
]

exports['Resolve should resolve type: function 1'] = [
  {
    "mode": "development"
  }
]

exports['Resolve should resolve type: function-promise 1'] = [
  {
    "mode": "development"
  }
]

exports['Resolve should resolve type: promise 1'] = [
  {
    "mode": "development"
  }
]
