import User from "../models/User.js"
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/auth-utils.js";

export default {
    async register(userData) {

        const user = await User.findOne({ email: userData.email }).select({ _id: true })
        
        if (user) {
            throw new Error('User already exists!');
        }
        if (userData.password !== userData.rePassword) {
            throw new Error('Password missmatch');
        }
        
        const createdUser = await User.create(userData);
        const token = generateToken(createdUser);

        return token
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

        const token = generateToken(user);

        return token
    }
}