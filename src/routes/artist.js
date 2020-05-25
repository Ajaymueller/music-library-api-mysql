const express = require('express');
const artistControllers = require('../controllers/artists');

const router = express.Router();

router.post('/', artistControllers.createArtist);

router.get('/', artistControllers.listArtists);

router.get('/find', artistControllers.findByArtistName);

router.get('/:id', artistControllers.findByArtistId);

router.get('/find/genre', artistControllers.findByArtistGenre);

router.patch('/:id', artistControllers.updateArtistGenre);

router.patch('/:id', artistControllers.updateArtistName);

router.delete('/:id', artistControllers.deleteArtistByArtistId);

module.exports = router;