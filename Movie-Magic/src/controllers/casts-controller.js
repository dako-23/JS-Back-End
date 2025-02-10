import { Router } from "express";
import castService from "../../service/cast-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";
import { gotErrorMessage } from "../utils/error-utils.js";

const addCastController = Router();

addCastController.use(isAuth)

addCastController.get('/create', (req, res) => res.render('casts/create'));

addCastController.post('/create', async (req, res) => {
    const newCast = req.body
    
    try {
        await castService.create(newCast)
    } catch (err) {
        // res.setError(gotErrorMessage(err));
        return res.render('casts/create', { cast: newCast, error: gotErrorMessage(err)})
    }

    res.redirect('/');
});

export default addCastController;