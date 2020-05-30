const express = require('express');
const artistControllers = require('../controllers/artists');

const router = express.Router();

router.route('/')
.post(artistControllers.createArtist)
.get(artistControllers.listArtists)

router.route('/:id')
.get(artistControllers.findByArtistId)
.patch(artistControllers.updateArtistGenre)
.patch(artistControllers.updateArtistName)
.delete(artistControllers.deleteArtistByArtistId)

router.get('/find', artistControllers.findByArtistName);

router.get('/find/genre', artistControllers.findByArtistGenre);



module.exports = router;