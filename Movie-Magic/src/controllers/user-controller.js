import { Router } from "express"
import userService from "../../service/user-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";
import { gotErrorMessage } from "../utils/error-utils.js";

const userController = Router();

userController.get('/register', (req, res) => { res.render('users/register') });

userController.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await userService.register(userData)
    } catch (err) {
        return res.render('users/register', { email: userData.email, error: gotErrorMessage(err) })

    }

    res.redirect('/user/login')
});

userController.get('/login', (req, res) => { res.render('users/login') });

userController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);

        res.cookie('auth', token, { httpOnly: true })
        res.redirect('/')

    } catch (err) {
        return res.render('users/login', { email, error: gotErrorMessage(err) })
    }
});

userController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');

    res.redirect('/')
});

export default userController;