const express = require('express');
const PORT = 5000;
const app = express();
const cors = require('cors');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const keys = require('./Config/keys.config');
const bodyParser = require('body-parser');
const routes = require('./Routes/routes');

require('./db.connection'); // DB connection
require('./Config/cloudinary.config'); // Cloudinary Config

let headers = {
  origin: 'http://localhost:3000',
  methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  exposedHeaders: ['Access-Control-Allow-Origin'],
  credentials: true // allow session cookie from browser to pass through 
}

app.use(
  cookieSession({
    name: "session",
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000
  })
);

app.use(cookieParser()); // Parse cookie to get req.cookies


app.use(passport.initialize()); // Initialize
app.use(passport.session());

require('./Passport/passport-google.auth')(passport); // Google Passport OAuth Config

app.use(cors(headers));
app.use(bodyParser.json()); // Parse the incoming req body
app.use(routes);


app.listen(PORT, () => console.log(`Listening to server on http://localhost:${PORT}`));