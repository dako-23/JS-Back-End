import { Router } from "express";
import homeController from "./controllers/home-controller.js";
import authController from "./controllers/auth-controller.js";
import recipesController from "./controllers/recipes-controller.js";

const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);
routes.use('/recipes', recipesController);

routes.get('*', (req, res) => res.render('404'));

export default routes;