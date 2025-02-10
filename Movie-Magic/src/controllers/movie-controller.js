import { Router } from "express";
import movieService from "../../service/movie-service.js";
import castService from "../../service/cast-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";


const addMovieController = Router();

addMovieController.get('/create', (req, res) => res.render('create'));

addMovieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body
    const creatorId = req.user?.id

    await movieService.create(newMovie, creatorId)

    res.redirect('/');
})

addMovieController.get('/search', async (req, res) => {
    const filter = req.query

    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

addMovieController.get('/:id/details', async (req, res) => {

    const id = req.params.id
    const movie = await movieService.getOne(id).populate('casts');

    const isCreator = movie.creator == req.user?.id

    res.render('movies/details', { movie, isCreator });
});

addMovieController.get('/:id/attach-cast', isAuth, async (req, res) => {
    const id = req.params.id

    const movie = await movieService.getOne(id)
    const casts = await castService.getAll({ exclude: movie.casts })

    res.render('movies/attach-cast', { movie, casts })
})

addMovieController.post('/:id/attach-cast', isAuth, async (req, res) => {
    const castId = req.body.cast
    const movieId = req.params.id

    await movieService.attachCast(movieId, castId)

    res.redirect(`/movies/${movieId}/details`)
})

addMovieController.get('/:id/delete', isAuth, async (req, res) => {

    const MovieId = req.params.id
    const movie = await movieService.getOne(MovieId)

    if (movie.creator.toString() !== req.user?.id) {
        return res.redirect('/404')
    }

    await movieService.delete(MovieId)

    res.redirect('/')
})

addMovieController.get('/:id/edit', isAuth, async (req, res) => {
    const movieId = req.params.id
    const movie = await movieService.getOne(movieId)

    res.render('movies/edit', { movie })
})

addMovieController.post('/:id/edit', isAuth, async (req, res) => {
    const movieData = req.body
    const movieId = req.params.id

    await movieService.update(movieId, movieData)

    res.redirect(`/movies/${movieId}/details`)
})

export default addMovieController;
