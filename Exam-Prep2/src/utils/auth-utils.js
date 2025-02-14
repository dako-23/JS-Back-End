import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config.js";

export const generateToken = (user) => {

    const payload = {
        id: user.id,
        name: user.name,
        email: user.email
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

    return token
}