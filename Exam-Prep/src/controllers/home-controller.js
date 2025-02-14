import { Router } from "express";
import deviceService from "../services/device-service.js";
import { getErrorMessage } from "../utils/error-utils.js";
import { isAuth } from "../middlewares/auth-middleware.js";

const homeController = Router();

homeController.get('/', async (req, res) => {

    try {
        const latestProducts = await deviceService.getLatest()
        res.render('home', { latestProducts })
    } catch (err) {
        res.setError(getErrorMessage(err))
        res.redirect('/404')
    }
})

homeController.get('/about', (req, res) => { res.render('about') });

homeController.get('/profile', isAuth, async (req, res) => {
    const userId = req.user.id;

    try {
        const ownOffers = await deviceService.getAll({ owner: userId })
        const prefer = await deviceService.getAll({ preferredList: userId })

        res.render('profile', { ownOffers, prefer });
    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('/404')
    };
});

export default homeController;