const { lighthouse: lhConfig } = require('./store.config');

module.exports = {
  urls: Object.values(lhConfig.pages),
  server: lhConfig.server
};
