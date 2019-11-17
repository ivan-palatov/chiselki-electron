const path = require('path');
const merge = require('webpack-merge');

module.exports = function(config) {
  config = merge.smart(config, {
    resolve: { alias: { static: path.resolve(__dirname, 'static') } },
  });

  return config;
};
