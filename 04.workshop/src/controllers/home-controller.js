import { Router } from "express";
import fs from 'fs';

const router = Router();

router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./src/config/database.json', 'utf-8'))

    res.render('home', { data })
})

router.get('/create', (req, res) => res.render('create'));

router.get('/search', (req, res) => res.render('search'));

router.get('/about', (req, res) => res.render('about'));

export default router;