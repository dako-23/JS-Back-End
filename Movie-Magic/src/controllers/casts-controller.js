import { Router } from "express";
import castService from "../../service/cast-service.js";

const addCastController = Router();

addCastController.get('/create', (req, res) => res.render('casts/create'));

addCastController.post('/create', async (req, res) => {

    const newCast = req.body
    
    await castService.create(newCast)

    res.redirect('/');
})

export default addCastController;