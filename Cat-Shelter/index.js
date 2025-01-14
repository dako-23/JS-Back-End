import http from 'http';
import siteCss from './content/styles/site.css.js';
import indexHtml from './views/home/index.html.js';
import addBreedHtml from './views/addBreed.html.js';
import addCatHtml from './views/addCat.html.js';

const cats = [
    {
        id: 1,
        imageUrl: 'https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=vvM97wWz-hMj7DLzfpYRmY2VswTqcFEKkC437hxm3Cg=',
        name: 'Pretty Kitty',
        breed: 'Bombay Cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
        id: 2,
        imageUrl: 'https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=vvM97wWz-hMj7DLzfpYRmY2VswTqcFEKkC437hxm3Cg=',
        name: 'Navcho',
        breed: 'Persian Cat',
        description: 'A talkative and affectionate cat with striking yellow eyes.',
    },
    {
        id: 3,
        imageUrl: 'https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=vvM97wWz-hMj7DLzfpYRmY2VswTqcFEKkC437hxm3Cg=',
        name: 'Sisa',
        breed: 'Siamese Cat',
        description: 'Loves to cuddle and nap. Requires regular grooming for its luxurious coat.',
    },
    {
        id: 4,
        imageUrl: 'https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=vvM97wWz-hMj7DLzfpYRmY2VswTqcFEKkC437hxm3Cg=',
        name: 'Garry',
        breed: 'Bombay Cat',
        description: 'Mysterious and elegant. Often found lounging in sunny spots.',
    },
];

const server = http.createServer((req, res) => {

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
            res.write(addCatHtml())
            break

        default:
            res.write('Page not found!')
            break;
    }

    res.end();
})

server.listen(5000);
console.log('Server is listening on http://localhost:5000...');
