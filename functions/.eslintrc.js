module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  // extends: [ 'eslint:recommended', 'google' ],
  rules: {
    // quotes: [ 'error', 'double' ],
    'max-len': [ 'error', { code: 180 } ],
    'space-in-parens': [ 'error', 'never' ]
  }
};
