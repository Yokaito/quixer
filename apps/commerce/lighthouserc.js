const { lighthouse: lhConfig } = require('./store.config');

module.exports = {
  ci: {
    urls: Object.values(lhConfig.pages),
    server: lhConfig.server,
    startServerCommand: lhConfig.startServerCommand,
    collect: {
      url: Object.values(lhConfig.pages).map((url) => `${lhConfig.server}${url}`)
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
