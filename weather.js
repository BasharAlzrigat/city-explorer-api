const { default: axios } = require("axios");
const handleError = require('./server.js')

const weatherCache = {};

class Forecast {
    constructor(value) {
        this.date = value.datetime;
        this.description = `Low of ${value.low_temp}, high of ${value.high_temp} with ${value.weather.description}`
    }
}

let weatherFunction = async function (req, res) {
    const weatherBitEndPoints = {
        searchQuery: req.query.searchQuery,
        lat: req.query.lat,
        lon: req.query.lon,
        key: process.env.WEATHER_API_KEY
    }
    if (weatherCache[weatherBitEndPoints.searchQuery] !== undefined) {
        console.log('Cache hit');
        res.status(200).send(weatherCache[weatherBitEndPoints.searchQuery]);
    } else {

        const getWeatherBit = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${weatherBitEndPoints.lat}&lon=${weatherBitEndPoints.lon}&key=${process.env.WEATHER_API_KEY}`)
        try {
            const weatherBitArray = getWeatherBit.data.data.map(value => {
                return new Forecast(value)
            })
            weatherCache[weatherBitEndPoints.searchQuery] = weatherBitArray;
            res.status(200).send(weatherBitArray);
        } catch (error) {
            handleError(error, res)
        }
    }
}

module.exports = weatherFunction;