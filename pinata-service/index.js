import dotenv from 'dotenv';
dotenv.config();

import corsMiddleware from 'restify-cors-middleware2';
import { media, upload } from './pinata.js';
import restify from 'restify';

const server = restify.createServer({
    name: 'pinata-service'
});

const cors = corsMiddleware({
    origins: [process.env.SERVER_ORIGIN],
    allowHeaders: ['Content-Type'],
    exposeHeaders: ['Content-Type']
});

server.pre(cors.preflight);
server.use(cors.actual);
// server.use(restify.plugins.bodyParser({
//     maxBodySize: 0,
//     mapParams: true,
//     mapFiles: false,
//     overrideParams: false
// }));
server.use(restify.plugins.queryParser());

server.post('/upload', upload);
server.get('/media/:cid', media);

server.listen(8102, '127.0.0.1', () => {
    console.log('%s listening at %s', server.name, server.url);
});