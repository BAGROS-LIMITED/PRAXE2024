const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://car.jakubgrezl.cz',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
