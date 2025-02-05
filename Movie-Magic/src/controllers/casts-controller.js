import { Router } from "express";
import castService from "../../service/cast-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";


const addCastController = Router();
addCastController.use(isAuth)

addCastController.get('/create', (req, res) => res.render('casts/create'));

addCastController.post('/create', async (req, res) => {

    const newCast = req.body

    await castService.create(newCast)

    res.redirect('/');
});

export default addCastController;