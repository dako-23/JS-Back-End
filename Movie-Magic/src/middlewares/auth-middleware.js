import jwt from 'jsonwebtoken'
import 'dotenv/config';


const secret = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth']

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, secret)

        req.user = decodedToken;
        res.locals.user = decodedToken

        next()
    } catch (err) {
        res.setError('You are not authorize')
        res.clearCookie('auth')
        res.redirect('/user/login')
    }
}

export const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/user/login');
    }

    next();
}