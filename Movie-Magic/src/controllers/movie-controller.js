import { Router } from "express";
import movieService from "../../service/movie-service.js";
import castService from "../../service/cast-service.js";

const addMovieController = Router();

addMovieController.get('/create', (req, res) => res.render('create'));

addMovieController.post('/create', async (req, res) => {
    const newMovie = req.body

    await movieService.create(newMovie)

    res.redirect('/');
})

addMovieController.get('/:id/delete', async (req, res) => {

    const id = req.params.id

    await movieService.delete(id)

    res.redirect('/')
})

addMovieController.get('/search', async (req, res) => {
    const filter = req.query

    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

addMovieController.get('/:id/details', async (req, res) => {

    const id = req.params.id
    const movie = await movieService.getOne(id).populate('casts');
    // console.log(movie);

    res.render('movies/details', { movie });
});

addMovieController.get('/:id/attach-cast', async (req, res) => {
    const id = req.params.id

    const movie = await movieService.getOne(id)
    const casts = await castService.getAll()

    res.render('movies/attach-cast', { movie, casts })
})

addMovieController.post('/:id/attach-cast', async (req, res) => {
    const castId = req.body.cast
    const movieId = req.params.id

    await movieService.attachCast(movieId, castId)

    res.redirect(`/movies/${movieId}/details`)
})

export default addMovieController;
