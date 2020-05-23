const express = require('express');
const songControllers = require('../controllers/song');

const router = express.Router();

router.post(`/albums/:albumId/song`, songControllers.create);

router.get('/song', songControllers.listSongs);

router.get(`/albums/:albumId/song`, songControllers.findAllById);

router.get('/song/:songId', songControllers.findOneById);

router.get('/song/find/name', songControllers.findByName);

router.get('/artists/:artistId/songs', songControllers.findByArtistId);

router.patch('/song/:songId', songControllers.update);

router.delete('/song/:songId', songControllers.delete);

module.exports = router;