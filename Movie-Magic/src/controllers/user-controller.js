import { Router } from "express"
import userService from "../../service/user-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";

const userController = Router();

userController.get('/register', (req, res) => { res.render('users/register') });

userController.post('/register', async (req, res) => {
    const userData = req.body;

    await userService.register(userData)

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
        console.log(err.message);
        return res.redirect('/404')
    }
})

userController.get('/logout', isAuth, (req, res) => {

    res.clearCookie('auth');
    res.redirect('/')
})

export default userController;