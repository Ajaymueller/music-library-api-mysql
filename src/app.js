const express = require('express');

const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');
const artistControllers = require('./controllers/artists');
const albumControllers = require('./controllers/album');

const app = express();

app.use(express.json());

app.post('/artists', artistControllers.create);

app.get('/artists', artistControllers.list);

app.get('/artists/:id', artistControllers.findById);

app.patch('/artists/:id', artistControllers.updateGenre);

app.patch('/artists/:id', artistControllers.updateName);

app.delete('/artists/:id', artistControllers.deleteArtist);

// app.use('/artists', artistRouter);

app.post('/artists/:artistId/albums', albumControllers.create);

app.get(`/albums/:artistId`, albumControllers.findById);

module.exports = app;
