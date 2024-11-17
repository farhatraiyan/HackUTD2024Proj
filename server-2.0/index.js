import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import { getImage, uploadImage } from './routes/media.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('port', 8101);
app.use(express.static(path.join(__dirname, 'dist')));

const servePage = page => (req, res) => {
    res.sendFile(path.join(__dirname, `dist/views/${page}.html`));
};

app.get('/', servePage('home'));
app.get('/about', servePage('about'));
app.get('/create', servePage('create'));
app.get('/media', servePage('media'));
app.get('/media/:id', servePage('mediaid'));
app.get('/signin', servePage('signin'));
app.get('/upload', servePage('upload'));
app.get('/user', servePage('user'));

app.get('/media/image/:id', getImage);
app.post('/media/upload', uploadImage);

app.listen(app.get('port'), () => {
    console.log(`Server running at http://127.0.0.1:${app.get('port')}/`);
});