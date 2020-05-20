const express = require('express');

const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');
const artistControllers = require('./controllers/artists');
const albumControllers = require('./controllers/album');
const songControllers = require('./controllers/song');

const app = express();

app.use(express.json());

app.post('/artists', artistControllers.create);

app.get('/artists', artistControllers.list);

app.get('/artists/find', artistControllers.findByName);

app.get('/artists/:id', artistControllers.findById);

app.patch('/artists/:id', artistControllers.updateGenre);

app.patch('/artists/:id', artistControllers.updateName);

app.delete('/artists/:id', artistControllers.deleteArtist);

// app.use('/artists', artistRouter);

app.post('/artists/:artistId/albums', albumControllers.create);

app.get(`/artists/:artistId/albums`, albumControllers.findById);

app.get(`/artists/:artistId/albums/:albumId`, albumControllers.findOneById);

app.patch('/albums/:albumId', albumControllers.updateById);

app.patch(`/artists/:artistid/albums`, albumControllers.updateByArtistId);

app.delete(`/artists/:artistId/albums/:albumId`, albumControllers.deleteById);

app.delete(`/artists/albums/:albumId`, albumControllers.deleteByIdAndName);

// app.use('/songs', albumRouter);

app.post(`/albums/:albumId/song`, songControllers.create);

app.get(`/albums/:albumId/song`, songControllers.findAllById);

app.get(`/song/:songId`, songControllers.findOneById);

app.patch('/song/:songId', songControllers.update);

app.delete('/song/:songId', songControllers.delete);

module.exports = app;
