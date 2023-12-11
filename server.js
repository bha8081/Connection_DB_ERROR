require('dotenv').config();
const express = require('express');
const databaseconnect = require('./config/databaseConfig.js');
const app = express();
//const PORT = process.env.PORT // || 5001;

//const app = require('./app');
databaseconnect();
app.listen(5000, () => {
    console.log(`Server is listening at http://localhost:5000`)
});