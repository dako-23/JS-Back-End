import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';
import showRating from './helpers/rating-helper.js';
import mongoose from 'mongoose';

//setup server
const app = express();

//setup DB
try {
    const uri = 'mongodb://localhost:27017/magic-movie-jan2025';
    await mongoose.connect(uri)

    console.log('connect to DB successfully')

} catch (err) {
    console.log(err.message);
}

//setup hbc
app.engine('hbs', handlebars.engine(
    {
        extname: 'hbs',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true
        },
        helpers: {
            showRating
        },

    }))

app.set('view engine', 'hbs');
app.set('views', './src/views')

//setup express
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));

//setup roots
app.use(routes)

//start server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000....'));
