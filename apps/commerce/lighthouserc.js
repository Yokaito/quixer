const { lighthouse: lhConfig } = require('./store.config');

module.exports = {
  ci: {
    collect: {
      url: Object.values(lhConfig.pages).map((url) => `${lhConfig.server}${url}`),
      startServerCommand: lhConfig.startServerCommand
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
