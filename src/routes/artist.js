const express = require('express');
const artistControllers = require('../controllers/artists');

const router = express.Router();

router.get('/find', artistControllers.findByArtistName);

router.get('/find/genre', artistControllers.findByArtistGenre);

router.get('/find/letter', artistControllers.findByFirstLetter);

router.route('/')
.post(artistControllers.createArtist)
.get(artistControllers.listArtists)

router.route('/:id')
.get(artistControllers.findByArtistId)
.patch(artistControllers.updateArtistById)
.delete(artistControllers.deleteArtistByArtistId)

module.exports = router;