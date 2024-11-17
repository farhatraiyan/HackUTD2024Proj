import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import { getImage, listImages, uploadImage } from './routes/media.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('port', 8101);
app.use(express.static(path.join(__dirname, 'dist')));
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const servePage = page => (req, res) => {
    res.sendFile(path.join(__dirname, `dist/views/${page}.html`));
};

app.get('/', servePage('home'));
app.get('/about', servePage('about'));
app.get('/create', servePage('create'));
app.get('/media', servePage('media'));
app.get('/media/:id([a-zA-Z0-9]{59})', servePage('mediaid'));
app.get('/signin', servePage('signin'));
app.get('/upload', servePage('upload'));
app.get('/user', servePage('user'));

app.get('/media/image', listImages);
app.get('/media/image/:id', getImage);
app.post('/media/upload', uploadImage);

app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error:`, {
        method: req.method,
        url: req.url,
        error: err.message,
        stack: err.stack
    });
    res.status(500).json({ error: 'Internal Server Error' });
});

app.use((req, res) => {
    console.log(`[${new Date().toISOString()}] 404 Not Found: ${req.method} ${req.url}`);
    res.status(404).json({ error: 'Not Found' });
});

app.listen(app.get('port'), () => {
    console.log(`Server running at http://127.0.0.1:${app.get('port')}/`);
});