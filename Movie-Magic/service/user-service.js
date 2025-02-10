import User from "../src/models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET;

export default {
    async register(userData) {

        const userCount = await User.countDocuments({ email: userData.email })
        // if (userData.password !== userData.rePassword) {
        //     throw new Error('Password missmatch!')
        // }

        if (userCount !== 0) {
            throw new Error('This email is already exist');
        }

        return User.create(userData)
    },
    async login(email, password) {

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid username or password')
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid username or password')
        }

        const payload = {
            id: user.id,
            email: user.email
        }

        const token = jwt.sign(payload, secret, { expiresIn: '2h' })

        return token
    }
}