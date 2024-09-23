/* eslint-disable no-undef */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "amd": true,
        "node": true,
        "mocha": true
    },
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": ["wdio", "mocha"],
    "extends": [
        "eslint:recommended",
        "plugin:wdio/recommended",
    ],
    "rules": {
        "mocha/no-skipped-tests": "error",
        "mocha/no-exclusive-tests": "error"
    },
}
