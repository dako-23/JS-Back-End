import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        require: true,
        
    },
    age: Number,
    born: String,
    nameInMovie: String,
    imageUrl: String,
})

const Cast = model('Cast', castSchema);

export default Cast;