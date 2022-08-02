'use strict';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const weather = require('./data/weather.json');

app.get('/weather', (req, res) => {
    let finalResult = [];
    const targetedData = {
        lon: req.query.lon,
        lat: req.query.lat,
        searchQuery: req.query.searchQuery
    }
    let result = weather.find(value => {
        return (value.city_name.toLowerCase() === targetedData.searchQuery && value.lon === targetedData.lon && value.lat === targetedData.lat);
    });
    if (result) {
        result.data.forEach(value => {
            finalResult.push(
                {
                    description: `Low of ${value.low_temp}, high of ${value.max_temp} with ${value.weather.description}`,
                    date: value.datetime
                }
            )
        })
        res.send(finalResult);
    } else {
        res.status(404).send('Not found');
    }
});

