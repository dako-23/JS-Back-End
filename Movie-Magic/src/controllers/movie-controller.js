import { Router } from "express";
import movieService from "../../service/movie-service.js";
import castService from "../../service/cast-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";
import { gotErrorMessage } from "../utils/error-utils.js";

const addMovieController = Router();

addMovieController.get('/create', (req, res) => res.render('create'));

addMovieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body
    const creatorId = req.user?.id
    try {
        await movieService.create(newMovie, creatorId)

    } catch (err) {
        return res.render('create', { movie: newMovie, error: gotErrorMessage(err) })
    }

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

    const isCreator = movie.creator?.equals(req.user?.id);

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

    try {
        await movieService.attachCast(movieId, castId)

    } catch (err) {
        res.setError(gotErrorMessage(err))
        return res.redirect(`/movies/${movieId}/details`)

    }

    res.redirect(`/movies/${movieId}/details`)
})

addMovieController.get('/:id/delete', isAuth, async (req, res) => {

    const MovieId = req.params.id
    const movie = await movieService.getOne(MovieId)

    if (movie.creator.toString() !== req.user?.id) {
        res.setError('You are not the movie owner!')
        return res.redirect('/404')
    }

    await movieService.delete(MovieId)

    res.redirect('/')
})

addMovieController.get('/:id/edit', isAuth, async (req, res) => {
    const movieId = req.params.id
    const movie = await movieService.getOne(movieId)

    const categories = getCategoriesViewData(movie.category);

    res.render('movies/edit', { movie, categories })
})

addMovieController.post('/:id/edit', isAuth, async (req, res) => {
    const movieData = req.body
    const movieId = req.params.id
    console.log(movieId);


    try {
        await movieService.update(movieId, movieData)
    } catch (err) {
        const categories = getCategoriesViewData(movieData.category);
        // res.setError(gotErrorMessage(err))
        return res.render(`movies/edit`, { movie: movieData, categories, error: gotErrorMessage(err) })
    }

    res.redirect(`/movies/${movieId}/details`)
});

function getCategoriesViewData(category) {
    const categoriesMap = {
        'tv-show': 'TV Show',
        'animation': 'Animation',
        'movie': 'Movie',
        'documentary': 'Documentary',
        'short-film': 'Short Film',
    };

    const categories = Object.keys(categoriesMap).map(value => ({
        value,
        label: categoriesMap[value],
        selected: value === category ? 'selected' : '',
    }))

    return categories;
}

export default addMovieController;
