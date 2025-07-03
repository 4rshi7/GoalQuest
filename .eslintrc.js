module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'import/extensions': ['error', { js: 'always' }], // require js file extensions in imports
<<<<<<< HEAD
    'linebreak-style': ['error', 'unix'], // enforce unix linebreaks         revert before commit to unix
=======
    'linebreak-style': ['error', 'windows'], // enforce unix linebreaks         revert before commit to unix
>>>>>>> a333d43 (minor cosmetic changes)
    'no-param-reassign': [2, { props: false }], // allow modifying properties of param
  },
};
