import { Router } from 'express'
import homeController from './controllers/home-controller.js'
import addMovieController from './controllers/movie-controller.js';
import addCastController from './controllers/casts-controller.js';

const routes = Router();

routes.use(homeController)
routes.use('/movies', addMovieController)
routes.use('/casts', addCastController)

routes.get('*', (req, res) => res.render('404'));

export default routes;

