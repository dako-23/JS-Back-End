import express from 'express';
import handlebars from 'express-handlebars';

import database from './config/database.js';

const app = express();

app.use(express.static('static'));

app.engine('hbs', handlebars.engine(
    {
        extname: 'hbs',

    }))

app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('home', { database })
})
app.get('/create', (req, res) => res.render('create'))
app.get('/search', (req, res) => res.render('search'))
app.get('/about', (req, res) => res.render('about'))



app.listen(5000, () => console.log('Server is listening on http://localhost:5000....'));
