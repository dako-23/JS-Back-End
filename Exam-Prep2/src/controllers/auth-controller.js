import { Router } from "express";
import authService from "../services/auth-service.js";
import { JWT_AUTH_NAME } from "../config.js";
import { isAuth, isLogged } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/error-utils.js";

const authController = Router();

authController.get('/register', isLogged, (req, res) => { res.render('auth/register') });

authController.post('/register', isLogged, async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);

        res.cookie(JWT_AUTH_NAME, token, { httpOnly: true });

        res.redirect('/');
    } catch (err) {

        res.render('auth/register', {
            error: getErrorMessage(err),
            name: userData.name,
            email: userData.email,
        })
    }
})

authController.get('/login', isLogged, (req, res) => { res.render('auth/login') });

authController.post('/login', isLogged, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie(JWT_AUTH_NAME, token, { httpOnly: true })

        res.redirect('/');
    } catch (err) {
        res.render('auth/login', { error: getErrorMessage(err), email, })

    }

})

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie(JWT_AUTH_NAME);

    res.redirect('/');
});

export default authController;