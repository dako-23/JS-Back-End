import Cast from "../src/models/Cast.js";

export default {
    getAll() {
        let data = Cast.find({});

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
    }
}