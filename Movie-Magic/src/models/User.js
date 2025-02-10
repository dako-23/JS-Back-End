import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true, // Sanitizer
        match: /\@[a-zA-z]+.[a-zA-z]+$/,
        minLength: 10,
    },
    password: {
        type: String,
        match: /^\w+$/,
        minLength: 6,
        trim: true, // Sanitizer
    },
})

userSchema.virtual('rePassword')
    .set(function (rePassword) {
        if (rePassword !== this.password) {
            throw new Error('Password missmatch!')
        }

    })

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)

})

const User = model('User', userSchema);

export default User;