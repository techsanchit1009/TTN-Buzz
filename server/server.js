const express = require('express');
const PORT = 5000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
require('./db.connection'); // DB connection
require('./Config/cloudinary.config'); // Cloudinary Config

let headers = {
  origin: '*',
  methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  exposedHeaders: ['Access-Control-Allow-Origin'],
}

app.use(cors(headers));
app.use(bodyParser.json()); // Parse the incoming req body
app.use(routes);


app.listen(PORT, () => console.log(`Listening to server on http://localhost:${PORT}`));