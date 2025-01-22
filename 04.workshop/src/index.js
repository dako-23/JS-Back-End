import express, { urlencoded } from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';
import showRating from './helpers/rating-helper.js';


const app = express();


app.engine('hbs', handlebars.engine(
    {
        extname: 'hbs',
        helpers: {
            showRating
        },

    }))

app.set('view engine', 'hbs');
app.set('views', './src/views')

app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));

app.use(routes)

app.listen(5000, () => console.log('Server is listening on http://localhost:5000....'));
