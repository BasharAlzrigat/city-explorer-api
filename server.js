'use strict';
require('dotenv').config();
const axios =require('axios')
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const weather = require('./data/weather.json');

app.get('/weatherbit', async (req, res)=>{
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

});

class Forecast{
    constructor(value){
        this.date = value.datetime;
        this.description = `Low of ${value.low_temp}, high of ${value.high_temp} with ${value.weather.description}`
    }
}




app.get('/movies', async (req, res)=>{
    const searchQuery = req.query.searchQuery
    const getMovieDb = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${searchQuery}`)

    try{
const theMovieDbArray = getMovieDb.data.results.map(value => {
    return new MoviesCreator(value)
})
         res.send(theMovieDbArray);

}catch(error){
    handleError(error, res)

}

});




class MoviesCreator{
    constructor(movie){
    this.title = movie.title
    this.overview = movie.overview
    this.average_votes = movie.vote_average
    this.total_votes = movie.vote_count
    this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    this.popularity = movie.popularity
    this.released_on = movie.release_date
        }
}




function handleError(error, res) {
        res.status(500).send('unexpected error');
    }
    



app.get('*', (req, res) => {res.status(404).send('Weather Data Not Found')})

// app.get('/weather', (req, res) => {
//     let finalResult = [];
//     const targetedData = {
//         lon: req.query.lon,
//         lat: req.query.lat,
//         searchQuery: req.query.searchQuery
//     }
//     let result = weather.find(value => {
//         return (value.city_name.toLowerCase() === targetedData.searchQuery ||  value.lon === targetedData.lon || value.lat === targetedData.lat);
//     });

//     try {
//         const weatherArray = result.data.map(element => new Forecast(element))
//         res.send(weatherArray);
    
//     }catch (error){
//         handleError(error, res)
//     }
// });

// app.get('*', (req, res) => {res.status(404).send('Weather Data Not Found')})

// function handleError(error, res) {
//     res.status(500).send('unexpected error');
// }







