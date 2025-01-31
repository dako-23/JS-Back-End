import { Router } from "express"
import cookieParser from "cookie-parser";
import expressSession from 'express-session';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userService from "../../service/user-service.js";

// import user service

const userController = Router();

userController.get('/register', (req, res) => { res.render('users/register') });

userController.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await userService.register({
        email,
        password: hash,
    })

    res.redirect('/login')
});



export default userController;