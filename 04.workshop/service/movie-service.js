import fs from 'fs'
import { v4 as uuid } from 'uuid';

export default {
    getAll() {
        const data = JSON.parse(fs.readFileSync('./src/config/database.json', 'utf-8'))
        return data
    },
    saveMovie(movie) {
        return fs.writeFileSync('./src/config/database.json', JSON.stringify(movie, null, 2), 'utf-8');
    },
    findOne(id) {

        const movies = this.getAll()

        const result = movies.find(movie => movie.id == id);

        return result
    },
    create(movieData) {
        const id = uuid()

        const movies = this.getAll()

        movies.push({
            id,
            ...movieData,
        })

        this.saveMovie(movies)
    }
}
