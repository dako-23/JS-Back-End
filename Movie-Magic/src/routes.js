import { Router } from 'express'
import homeController from './controllers/home-controller.js'
import addMovieController from './controllers/add-movie-controller.js';

const routes = Router();

routes.use(homeController)
routes.use('/movies', addMovieController)

routes.get('*', (req, res) => res.render('404'));

export default routes;

