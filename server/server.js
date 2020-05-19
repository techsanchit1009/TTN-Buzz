const express = require('express');
const PORT = 5000;
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
require('./db.connection'); // DB connection

app.use(bodyParser.json()); // Parse the incoming req body
app.use(routes);


app.listen(PORT, () => console.log(`Listening to server on http://localhost:${PORT}`));