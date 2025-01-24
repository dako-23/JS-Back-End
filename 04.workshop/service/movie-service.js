import fs from 'fs'
import { v4 as uuid } from 'uuid';

const dataPath = './src/config/database.json'

export default {
    getAll(filter = {}) {

        try {
            let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

            if (filter.search){
                data = data.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()))
            }
            if (filter.genre){
                data = data.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase())
            }
            if (filter.year){
                data = data.filter(movie => movie.year.toLowerCase() === filter.year.toLowerCase())
            }
                return data
        } catch (err) {
            return [];
        }

    },
    saveMovie(movie) {
        return fs.writeFileSync(dataPath, JSON.stringify(movie, null, 2), 'utf-8');
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
