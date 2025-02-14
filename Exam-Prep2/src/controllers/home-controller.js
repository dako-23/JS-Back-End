import { Router } from "express";
import recipeService from "../services/recipe-service.js";
import { getErrorMessage } from "../utils/error-utils.js";
// import { isAuth } from "../middlewares/auth-middleware.js";

const homeController = Router();

homeController.get('/', async (req, res) => {

    try {
        const latestRecipes = await recipeService.getLatest()
        res.render('home', { latestRecipes })
    } catch (err) {
        res.setError(getErrorMessage(err))
        res.redirect('/404')
    }
})

export default homeController;