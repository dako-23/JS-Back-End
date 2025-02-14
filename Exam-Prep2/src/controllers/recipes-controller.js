import { Router } from "express";
import recipeService from "../services/recipe-service.js";
import { getErrorMessage } from "../utils/error-utils.js";
import { isAuth } from "../middlewares/auth-middleware.js";

const recipesController = Router();

recipesController.get('/create', isAuth, (req, res) => { res.render('recipes/create') });

recipesController.post('/create', isAuth, async (req, res) => {
    const newRecipe = req.body;
    const creatorId = req.user?.id

    try {
        await recipeService.create(newRecipe, creatorId);

    } catch (err) {
        return res.render('recipes/create', { recipe: newRecipe, error: getErrorMessage(err) })
    }
    res.redirect('/recipes/catalog')
})

recipesController.get('/catalog', async (req, res) => {
    try {
        const allRecipes = await recipeService.getAll({})

        res.render('recipes/catalog', { allRecipes });
    } catch (err) {
        res.setError(getErrorMessage(err));

        res.redirect('/404')
    }

});

recipesController.get('/:id/details', async (req, res) => {
    const recipeId = req.params.id

    try {
        const recipe = await recipeService.getOne(recipeId)

        const isCreator = recipe.owner?.equals(req.user?.id);
        const isRecommend = recipe.recommendList?.includes(req.user?.id);
        const recommendCount = recipe.recommendList.length;

        res.render('recipes/details', { recipe, isCreator, isRecommend, recommendCount });
    } catch (err) {
        res.setError(getErrorMessage(err))
        res.redirect('/404')
    }
})

recipesController.get('/:id/edit', isAuth, async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await recipeService.getOne(recipeId);

        if (!recipe.owner?.equals(req.user?.id)) {
            res.setError('You are not the recipe owner!')
            return res.redirect('/recipes/catalog');
        };

        res.render('recipes/edit', { recipe });
    } catch (err) {
        res.setError(getErrorMessage(err))
        res.redirect('/404')
    }

});

recipesController.post('/:id/edit', isAuth, async (req, res) => {
    const recipeData = req.body;
    const recipeId = req.params.id

    try {
        await recipeService.update(recipeId, recipeData)
    } catch (err) {

        return res.render('recipes/edit', { recipe: recipeData, error: getErrorMessage(err) });
    }

    res.redirect(`/recipes/${recipeId}/details`)
});

recipesController.get('/:id/delete', isAuth, async (req, res) => {
    const recipeId = req.params.id;
    try {
        const recipe = await recipeService.getOne(recipeId)

        if (!recipe.owner?.equals(req.user?.id)) {
            res.setError('You are not the recipe owner!')
            return res.redirect('/recipes/catalog');
        };

        await recipeService.delete(recipeId);

        res.redirect('/recipes/catalog');
    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('/404');
    }
})

recipesController.get('/:id/recommend', isAuth, async (req, res) => {
    const recipeId = req.params.id
    const userId = req.user?.id

    try {
        await recipeService.recommend(recipeId, userId);
    } catch (err) {
        res.setError(getErrorMessage(err))
    }
    res.redirect(`/recipes/${recipeId}/details`);
});

recipesController.get('/search', async (req, res) => {
    const filter = req.query

    const recipes = await recipeService.getAll(filter);

    res.render('recipes/search', { recipes })
})

export default recipesController;
