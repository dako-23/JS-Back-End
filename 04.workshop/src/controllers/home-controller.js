import { Router } from "express";
import fs from 'fs';

const homeController = Router();

homeController.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./src/config/database.json', 'utf-8'))

    res.render('home', { data })
})

homeController.get('/about', (req, res) => res.render('about'));

export default homeController;