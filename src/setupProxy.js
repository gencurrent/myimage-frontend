const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
  if (process.env.NODE_ENV === 'production'){
    return;
  }
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_URL}`,
      changeOrigin: true,
    })
  );

  app.use(
    '/public',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_URL}`,
      changeOrigin: false,
    })
  );
  app.use(
    '/shared',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_URL}`,
      changeOrigin: false,
    })
  );
};
