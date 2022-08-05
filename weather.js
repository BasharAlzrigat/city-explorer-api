const { default: axios } = require("axios");
const handleError = require('./server.js')

class Forecast{
    constructor(value){
        this.date = value.datetime;
        this.description = `Low of ${value.low_temp}, high of ${value.high_temp} with ${value.weather.description}`
    }
}

let weatherFunction= async function(req, res){
    const weatherBitEndPoints = {

        lat: req.query.lat,
        lon: req.query.lon,
        key:process.env.WEATHER_API_KEY
    }
    const getWeatherBit = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${weatherBitEndPoints.lat}&lon=${weatherBitEndPoints.lon}&key=${process.env.WEATHER_API_KEY}`)
    try{
    let weatherBitArray = getWeatherBit.data.data.map(value => {
        return new Forecast(value)
    })
            res.send(weatherBitArray);
        }catch(error){
            handleError(error, res)
        }
    
}

module.exports = weatherFunction;