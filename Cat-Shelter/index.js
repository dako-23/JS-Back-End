import http from 'http';
import siteCss from './content/styles/site.css.js';
import indexHtml from './views/home/index.html.js';
import addBreedHtml from './views/addBreed.html.js';
import addCatHtml from './views/addCat.html.js';
import { v4 as uuid } from 'uuid'
import fs from 'fs/promises'


let cats = [];
let breeds = [];

initCats()
initBreads()

const server = http.createServer((req, res) => {

    if (req.method === 'POST' && req.url === '/cats/add-cat') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        })

        req.on('end', () => {
            const data = new URLSearchParams(body);

            cats.push({
                id: uuid(),
                ...Object.fromEntries(data.entries())
            })

            saveCats();

            res.writeHead(301, {
                'location': '/'
            })

            res.end()
        })

        return

    } else if (req.method === 'POST' && req.url === '/cats/add-breed') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        })

        req.on('end', () => {
            const data = new URLSearchParams(body);

           breeds.push({
            ...Object.fromEntries(data.entries())
           });
           
            saveBreeds();
            console.log(breeds);
            

            res.writeHead(301, {
                'location': '/'
            })

            res.end()
        })

        return
    }

    if (req.url === '/styles/site.css') {
        res.writeHead(200, {
            'content-type': 'text/css',
        });

        res.write(siteCss);

        return res.end();
    }

    res.writeHead(200, {
        'content-type': 'text/html'
    })

    switch (req.url) {
        case '/':
            res.write(indexHtml(cats));
            break;
        case '/cats/add-breed':
            res.write(addBreedHtml())
            break
        case '/cats/add-cat':
            res.write(addCatHtml(breeds))
            break

        default:
            res.write('Page not found!')
            break;
    }

    res.end();
})

async function initCats() {

    const catsJson = await fs.readFile('./cats.json', { encoding: 'utf-8' });
    cats = JSON.parse(catsJson);
}

async function saveCats() {
    const catJson = JSON.stringify(cats, null, 2);
    await fs.writeFile('./cats.json', catJson, { encoding: 'utf-8' });
}

async function initBreads() {
    const breedJson = await fs.readFile('./breeds.json', { encoding: 'utf-8' });
    breeds = JSON.parse(breedJson);
}

async function saveBreeds(){
    const breedJson = JSON.stringify(breeds, null, 2);
    await fs.writeFile('./breeds.json', breedJson, { encoding: 'utf-8' });
}

server.listen(5000);
console.log('Server is listening on http://localhost:5000...');
