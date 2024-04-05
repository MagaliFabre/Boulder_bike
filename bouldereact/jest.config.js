const config = {
  "bail": 1,
  "verbose": true,
  transform:{},
  "moduleNameMapper": {
    "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
    '^[./a-zA-Z0-9$_-]+\\.png$': '<rootDir>/RelativeImageStub.js',
    'module_name_(.*)': '<rootDir>/substituted_module_$1.js',
    'assets/(.*)': [
      '<rootDir>/images/$1',
      '<rootDir>/photos/$1',
      '<rootDir>/recipes/$1',
    ]
  }
}
module.exports = config