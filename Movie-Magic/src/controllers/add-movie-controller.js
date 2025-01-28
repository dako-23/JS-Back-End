import { Router } from "express";
import movieService from "../../service/movie-service.js";
import Movie from "../models/Movie.js";

const addMovieController = Router();

addMovieController.get('/create', (req, res) => res.render('create'));
addMovieController.post('/create', async (req, res) => {

    await Movie.create(req.body)

    res.redirect('/');
})

addMovieController.get('/search', async (req, res) => {
    const filter = req.query

    const movies = await movieService.getAll(filter);
    console.log(movies);

    res.render('search', { movies, filter });
});

addMovieController.get('/:id/details', async (req, res) => {

    const id = req.params.id
    const movie = await movieService.getOne(id);

    res.render('details', { movie });
});

export default addMovieController;
