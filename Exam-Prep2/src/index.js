import express from 'express';
import routes from './routes.js';
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
import { auth } from './middlewares/auth-middleware.js';
import setTitle from './helpers/title-helper.js';
import expressSession from 'express-session'
import { tempData } from './middlewares/tempData-middleware.js';

const app = express();

try {
    const uri = 'mongodb://localhost:27017/recipes-exam';
    await mongoose.connect(uri)
    console.log('connect to DB successfully')

} catch (err) {
    console.log(err.message);
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        setTitle
    }
}))

app.set('view engine', 'hbs');
app.set('views', './src/views')



app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false })); // body parser
app.use(cookieParser());
app.use(expressSession({
    secret: 'asdasdasdasd',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true
    }
}))
app.use(tempData)
app.use(auth)

app.use(routes)

app.listen(3000, () => console.log('Server is listening on http://localhost:3000....'));