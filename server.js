'use strict';
require('dotenv').config();

const axios =require('axios')
const express = require('express');
const cors = require('cors');
const app = express();
const Weather =require('./weather.js')
const Movie =require('./movies.js')

app.use(cors());
const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/weatherbit', Weather);
app.get('/movies', Movie);

app.get('*', (req, res) => {res.status(404).send('Data Not Found')})

function handleError(error, res) {
        res.status(500).send('unexpected error');
        res.status(404).send('Weather Data Not Found');
    }
    




module.exports = handleError






