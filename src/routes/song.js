const express = require('express');
const songControllers = require('../controllers/song');

const router = express.Router();

router.get('/song', songControllers.listSongs);

router.get('/artists/:artistId/songs', songControllers.findSongByArtistId);

router.get('/song/find/name', songControllers.findBySongName);

router.route('/song/:songId')
.get(songControllers.findSongBySongId)
.patch(songControllers.updateSongBySongId)
.delete(songControllers.deleteSongBySongId)

router.route(`/albums/:albumId/song`)
.post(songControllers.createSong)
.get(songControllers.findAllSongsByAlbumId)

module.exports = router;