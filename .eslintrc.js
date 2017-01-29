module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 'off',
    'no-plusplus': 'off',
    'prefer-arrow-callback': 'off',
    'func-names' : 'off',
    'object-shorthand' : 'off',
    'prefer-const' : 'off',
    'consistent-return' : 'off',
    'import/first': 'off',
    'max-len': 'off',
    'no-restricted-syntax': 'off',
    'no-undef': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'no-prototype-builtins': 'off',
    'prefer-template' : 'off',
    'guard-for-in' : 'off',
  },
  'env': {
    'browser': true,
    'jquery': true,
  },
}
