import Recipe from "../models/Recipes.js";


export default {
    create(recipeData, ownerId) {

        const result = Recipe.create({
            ...recipeData,
            owner: ownerId
        })
        return result
    },
    getLatest() {
        const latestProducts = Recipe.find().sort({ createdAt: -1 }).limit(3);

        return latestProducts
    },
    getAll(filter = {}) {
        let query = Recipe.find({})

        if (filter.owner) {
            query = query.find({ owner: filter.owner });
        }

        if (filter.preferredList) {
            query = query.find({ preferredList: filter.preferredList });
        }

        if (filter.search) {
            query = query.where({ title: { $regex: filter.search, $options: 'i' } });
        }

        return query
    },
    getOne(id) {
        const result = Recipe.findById(id)

        return result;
    },
    update(deviceId, deviceData) {

        return Recipe.findByIdAndUpdate(deviceId, deviceData, { runValidators: true });
    },
    delete(deviceId) {

        return Recipe.findByIdAndDelete(deviceId);
    },
    async recommend(recipeId, userId) {
        const recipe = await Recipe.findById(recipeId)

        if (recipe.owner.equals(userId)) {
            throw new Error('Cannot recommend own offer!')
        };

        if (recipe.recommendList.includes(userId)) {
            throw new Error('You already recommend this offer!')
        };

        recipe.recommendList.push(userId);

        return recipe.save();
    }
}