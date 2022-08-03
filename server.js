'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const weather = require('./data/weather.json');

class Forecast{
    constructor(value){
        this.date = value.datetime;
        this.description = value.weather.description
    }
}

app.get('/weather', (req, res) => {
    let finalResult = [];
    const targetedData = {
        lon: req.query.lon,
        lat: req.query.lat,
        searchQuery: req.query.searchQuery
    }
    let result = weather.find(value => {
        return (value.city_name.toLowerCase() === targetedData.searchQuery ||  value.lon === targetedData.lon || value.lat === targetedData.lat);
    });

    try {
        const weatherArray = result.data.map(element => new Forecast(element))
        res.send(weatherArray);
    
    }catch {
        res.status(500).send('unexpected error')
    }
});

