const express = require('express');
const artistControllers = require('../controllers/artists');

const router = express.Router();

router.post('/', artistControllers.create);

router.get('/', artistControllers.list);

router.get('/find', artistControllers.findByName);

router.get('/:id', artistControllers.findById);

router.get('/find/genre', artistControllers.findByGenre);

router.patch('/:id', artistControllers.updateGenre);

router.patch('/:id', artistControllers.updateName);

router.delete('/:id', artistControllers.deleteArtist);

module.exports = router;