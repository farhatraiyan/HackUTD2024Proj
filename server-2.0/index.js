import cookieParser from 'cookie-parser';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import passport from 'passport';
import session from 'express-session';

import { deleteImage, getImage, listImages, updateImage, uploadImage } from './routes/media.js';
import { waStrat, getChallenge, createChallenge } from './routes/webauthnProvider.js';

const app = express();

app.set('port', 8101);
app.use(express.json());
app.use(cookieParser("somesecret"));
app.use(
    session({
        secret: "somesecret",
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 60000
        }
    })
);

passport.use(waStrat());
app.use(passport.initialize());
app.use(passport.session());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
app.get('/create', servePage('create')); // signup
app.get('/media', servePage('media'));
app.get('/media/:id([a-zA-Z0-9]{59})', servePage('mediaid'));
app.get('/signin', servePage('signin'));
app.get('/upload', servePage('upload'));
app.get('/user', servePage('user'));

app.get('/media/image/:id', getImage);
app.delete('/media/image/:id', deleteImage);
app.get('/media/image', listImages);
app.post('/media/upload', uploadImage);
app.put('/media/upload/:id', updateImage);

app.post('/signin/passkey', passport.authorize('webauthn', { failureRedirect: '/signin' }), async (req, res) => {
    req.login(req.account, (err) => {
        if (err) {
            console.error('Session error:', err);
            return res.redirect('/signin');
        }

        req.session.user = req.account;

        res.redirect('/user');
    });
});
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ error: 'Logout failed' });
        }
        
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destruction error:', err);
                return res.status(500).json({ error: 'Session destruction failed' });
            }
            
            res.redirect('/signin');
        });
    });
});
app.get('/webauthn/challenge', getChallenge);
app.post('/webauthn/register', createChallenge);

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