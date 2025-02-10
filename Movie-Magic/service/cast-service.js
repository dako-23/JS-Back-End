import Cast from "../src/models/Cast.js";
import Movie from "../src/models/Movie.js";

export default {
    getAll(filter = {}) {
        let data = Cast.find({});

        if (filter.exclude) {
            data = data.nin('_id', filter.exclude)
        }

        return data
    },
    getOne() {
        const result = Movie.findById(id)

        return result
    },
    create(castData) {
        const result = Cast.create({
            ...castData,
        })

        return result
    },
}