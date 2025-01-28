import Movie from '../src/models/Movie.js';

export default {
    async getAll(filter = {}) {

        let data = await Movie.find({})

        // if (filter.search){
        //     data = data.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()))
        // }
        // if (filter.genre){
        //     data = data.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase())
        // }
        // if (filter.year){
        //     data = data.filter(movie => movie.year.toLowerCase() === filter.year.toLowerCase())
        // }
        return data
    },
    async getOne(id) {

        const result = await Movie.findById(id)

        return result

    },
    create(movieData) {

        const movies = this.getAll()

        movies.push({

            ...movieData,
        })
    }
}
