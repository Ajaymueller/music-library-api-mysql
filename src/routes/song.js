const express = require('express');
const songControllers = require('../controllers/song');

const router = express.Router();

router.post(`/albums/:albumId/song`, songControllers.createSong);

router.get('/song', songControllers.listSongs);

router.get('/artists/:artistId/songs', songControllers.findSongByArtistId);

router.get(`/albums/:albumId/song`, songControllers.findAllSongsByAlbumId);

router.get('/song/:songId', songControllers.findSongBySongId);

router.get('/song/find/name', songControllers.findBySongName);

router.patch('/song/:songId', songControllers.updateSongBySongId);

router.delete('/song/:songId', songControllers.deleteSongBySongId);

module.exports = router;