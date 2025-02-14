import { Schema, model, Types } from "mongoose";

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [2, 'The Title should be at least 2 characters']
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'The Description should be between 10 and 100 characters long'],
        maxLength: [100, 'The Description should be between 10 and 100 characters long']
    },
    ingredients: {
        type: String,
        required: true,
        minLength: [10, 'The Ingredients should be between 10 and 200 characters long'],
        maxLength: [200, 'The Ingredients should be between 10 and 200 characters long']
    },
    instructions: {
        type: String,
        required: true,
        minLength: [10, 'The Instuctions should be at least 10 characters long']
    },
    image: {
        type: String,
        validate: {
            validator: function (v) {
                return /^https?:\/\//.test(v)
            },
            message: (props) => `${props.value} is invalid image url!`
        }
    },
    recommendList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Recipe = model('Recipes', RecipeSchema);

export default Recipe;