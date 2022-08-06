const { default: axios } = require("axios");
const e = require("cors");
const handleError = require('./server.js')

const moviesCache = {};

class MoviesCreator {
    constructor(movie) {
        this.title = movie.title
        this.overview = movie.overview
        this.average_votes = movie.vote_average
        this.total_votes = movie.vote_count
        this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        this.popularity = movie.popularity
        this.released_on = movie.release_date
    }
}

let moviesFunction = async function (req, res) {
    const searchQuery = req.query.searchQuery
    if (moviesCache[searchQuery] !== undefined) {
        console.log('Cache hit');
        res.status(200).send(moviesCache[searchQuery])
    } else {
        const getMovieDb = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${searchQuery}`)
        try {
            const theMovieDbArray = getMovieDb.data.results.map(value => {
                return new MoviesCreator(value)
            })
            moviesCache[searchQuery] = theMovieDbArray;
            res.status(200).send(theMovieDbArray);
        } catch (error) {
            handleError(error, res)

        }
    }
}

module.exports = moviesFunction;