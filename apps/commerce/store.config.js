module.exports = {
  lighthouse: {
    startServerCommand: 'pnpm start --filter=commerce',
    server: process.env.BASE_SITE_URL || 'http://localhost:3000',
    pages: {
      home: '/',
      pdp: '/product/camiseta-de-manga-longa'
    }
  }
};
