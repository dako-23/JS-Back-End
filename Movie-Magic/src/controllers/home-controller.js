import { Router } from "express";
import movieService from "../../service/movie-service.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const movies = await movieService.getAll({})

    res.render('home', { movies });
})

homeController.get('/about', (req, res) => res.render('about'));

export default homeController;