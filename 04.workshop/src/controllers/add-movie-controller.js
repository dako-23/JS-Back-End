import { Router } from "express";

const addMovieController = Router();

addMovieController.get('/create', (req, res) => res.render('create'));

addMovieController.get('/search', (req, res) => res.render('search'));

export default addMovieController;
