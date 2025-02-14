import { JWT_AUTH_NAME, JWT_SECRET } from "../config.js"
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {

    const token = req.cookies[JWT_AUTH_NAME];

    if (!token) {
        return next();
    }
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;
        res.locals.user = decodedToken;


    } catch (err) {
        res.clearCookie(JWT_AUTH_NAME);
        res.setError('Authorization failed!')
        return res.redirect('/auth/login')

    }

    next();
};

export const isAuth = (req, res, next) => {

    if (!req.user) {
        res.setError('You must be logged in order to do that!')
        return res.redirect('/auth/login');
    }
    next();
}

export const isLogged = (req, res, next) => {
    if (req.user) {
        res.setError('You are already logged or registered')
        return res.redirect('/');
    }
    next();
}