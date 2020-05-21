const express = require('express');

const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');
const artistControllers = require('./controllers/artists');
const albumControllers = require('./controllers/album');
const songControllers = require('./controllers/song');

const app = express();

app.use(express.json());

app.use('/artists', artistRouter);

app.use('/', albumRouter);



app.post(`/albums/:albumId/song`, songControllers.create);

app.get('/song', songControllers.listSongs);

app.get(`/albums/:albumId/song`, songControllers.findAllById);

app.get(`/song/:songId`, songControllers.findOneById);

app.patch('/song/:songId', songControllers.update);

app.delete('/song/:songId', songControllers.delete);

module.exports = app;
