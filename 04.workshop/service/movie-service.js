import fs from 'fs'

export default {
    findOne(id) {

        const data = JSON.parse(fs.readFileSync('./src/config/database.json', 'utf-8'))

        const result = data.find(movie => movie.id == id);

        return result
    }

}
