import { Router } from "express";
import movieService from "../../service/movie-service.js";

const addMovieController = Router();

addMovieController.get('/create', (req, res) => res.render('create'));

addMovieController.get('/search', (req, res) => res.render('search'));

addMovieController.get('/:id/details', (req, res) => {

    const id = req.params.id;

    const movie = movieService.findOne(id);

    res.render('details', { movie })
});

export default addMovieController;
