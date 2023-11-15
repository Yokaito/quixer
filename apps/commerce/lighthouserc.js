const { lighthouse: lhConfig } = require('./store.config');

module.exports = {
  urls: Object.values(lhConfig.pages),
  server: lhConfig.server,
  startServerCommand: lhConfig.startServerCommand,
  staticDistDir: 'dist/apps/commerce',
  collect: {
    url: Object.values(lhConfig.pages).map((url) => `${lhConfig.server}${url}`)
  },
  upload: {
    target: 'temporary-public-storage'
  }
};
