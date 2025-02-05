import Movie from '../src/models/Movie.js';

export default {
    getAll(filter = {}) {

        let data = Movie.find({})

        if (filter.search) {
            data = data.where({ title: { $regex: filter.search, $options: 'i' } });
        }
        if (filter.genre) {
            data = data.where({ genre: { $regex: filter.genre, $options: 'i' } });

        }
        if (filter.year) {
            data = data.where({ year: filter.year });

        }
        return data
    },
    getOne(id) {

        const result = Movie.findById(id)

        return result
    },
    create(movieData, creatorId) {

        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId,
        })

        return result
    },
    delete(id) {

        return Movie.findByIdAndDelete(id)

    },
    async attachCast(movieId, castId) {

        // const movie = await Movie.findById(movieId);
        // movie.casts.push(castId);
        // await movie.save();

        // return movie

        const movie = await Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } })
        return movie;
    },
    async update(movieId, movieData) {

        return await Movie.findByIdAndUpdate(movieId, movieData);
    }
}
