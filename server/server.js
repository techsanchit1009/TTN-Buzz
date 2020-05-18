const express = require('express');
const PORT = 5000;
const app = express();
const authRoutes = require('./routes/auth.route');
require('./db.connection'); // DB connection


app.use('/auth', authRoutes);


app.listen(PORT, () => console.log(`Listening to server on http://localhost:${PORT}`));