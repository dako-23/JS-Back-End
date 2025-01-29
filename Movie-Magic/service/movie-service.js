import Movie from '../src/models/Movie.js';

export default {
    getAll(filter = {}) {

        let data = Movie.find({})

        if (filter.search) {
            data = data.where({ title: filter.search })
        }
        if (filter.genre) {
            data = data.where({ genre: filter.genre })

        }
        if (filter.year) {
            data = data.where({ year: filter.year })

        }
        return data
    },
    getOne(id) {

        const result = Movie.findById(id)

        return result
    },
    create(movieData) {

        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year)
        })

        return result
    },
    delete(id){

        const result = Movie.findByIdAndDelete(id)
        
        return result
    },
    async attachCast(movieId, castId) {
        
        const movie = await Movie.findById(movieId);
        movie.casts.push(castId);
        await movie.save();

        return movie
    }
}
