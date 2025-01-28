import { Router } from "express";
import Movie from "../models/Movie.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const movies = await Movie.find({})

    res.render('home', { movies });
})

homeController.get('/about', (req, res) => res.render('about'));

export default homeController;