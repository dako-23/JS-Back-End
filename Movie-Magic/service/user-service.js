import User from "../src/models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET;

export default {
    register(userData) {

        const result = User.create({
            ...userData,
        })
        return result
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