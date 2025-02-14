import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'The name should be between 2 and 20 characters long'],
        maxLength: [20, 'The name should be between 2 and 20 characters long']
    },
    email: {
        type: String,
        required: true,
        minLength: [10, 'The email should be at least 10 characters long'],
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'The password should be at least 4 characters long']
    }
})

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

const User = model('User', userSchema);

export default User;