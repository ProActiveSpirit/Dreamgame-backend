const path = require('path');
const jsConfig = require('./jsconfig.json');

module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    ['module-resolver', {
      root: [path.resolve(__dirname, jsConfig.compilerOptions.baseUrl)],
      alias: {
        // Add any aliases you want here
        '@routes': './src/routes',
        '@services': './src/services',
        '@controllers': './src/controllers',
      }
    }]
  ]
};