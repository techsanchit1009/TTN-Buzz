const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
   app.use(createProxyMiddleware('/auth/google', { target: 'http://localhost:5000/' }));
   app.use(createProxyMiddleware('/auth/logout', { target: 'http://localhost:5000/' }));
   app.use(createProxyMiddleware('/api/buzz', { target: 'http://localhost:5000/' }));
   app.use(createProxyMiddleware('/api/buzz/:action/*', { target: 'http://localhost:5000/' }));
   app.use(createProxyMiddleware('/api/*', { target: 'http://localhost:5000/' }));
   app.use(createProxyMiddleware('/auth/success', { target: 'http://localhost:5000/' }));
};