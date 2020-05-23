const express = require('express');
const ablbumControllers = require('../controllers/album');

const router = express.Router();

router.post('/artists/:artistId/albums', ablbumControllers.create);

router.get('/albums', ablbumControllers.list);

router.get('/artists/:artistId/albums', ablbumControllers.findById);

router.get(`/artists/:artistId/albums/:albumId`, ablbumControllers.findOneById);

router.get('/albums/find/name', ablbumControllers.findByName);

router.get('/albums/year', ablbumControllers.findByYear);

router.patch('/albums/:albumId', ablbumControllers.updateById);

router.delete(`/artists/:artistId/albums/:albumId`, ablbumControllers.deleteById);

router.delete(`/artists/albums/:albumId`, ablbumControllers.deleteByIdAndName);

router.delete('/artists/:artistId/albums', ablbumControllers.deleteByArtistId);


module.exports = router;