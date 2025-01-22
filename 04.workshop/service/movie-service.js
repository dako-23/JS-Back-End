import fs from 'fs'
import { v4 as uuid } from 'uuid';

const dataPath = './src/config/database.json'

export default {
    getAll() {

        try {
            const data = fs.readFileSync(dataPath, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }

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
            showRating: Number(movies.rating),

        })
        this.saveMovie(movies)
    }
}
