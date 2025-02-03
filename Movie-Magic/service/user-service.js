import User from "../src/models/User.js";

export default {
    register(userData) {

        const result = User.create({
            ...userData,
        })
        return result
    },
    getUser(email) {
        return User.findOne({ email: email })

    }
}