import { Router } from "express"
import cookieParser from "cookie-parser";
import expressSession from 'express-session';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userService from "../../service/user-service.js";

// import user service

const userController = Router();
const secret = 'DAKO'

userController.get('/register', (req, res) => { res.render('users/register') });

userController.post('/register', async (req, res) => {
    const userData = req.body;

    userService.register(userData)

    res.redirect('/user/login')
});

userController.get('/login', (req, res) => { res.render('users/login') });

userController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const userData = await userService.getUser(email)

    const isValid = userData.email === email && await bcrypt.compare(password, userData.password);

    if (!isValid) {
        console.log('Invalid password');
    }

    const token = jwt.sign({ email }, secret, { expiresIn: '2h' });

    res.cookie('authorization', token);

    res.redirect('/')
})

export default userController;