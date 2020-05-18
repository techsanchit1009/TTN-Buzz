const app = require('express').Router();

app.get('/', (req, res) => {
  res.send('hello from server');
});

module.exports = app;