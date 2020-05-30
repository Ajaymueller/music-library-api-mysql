const express = require('express');
const ablbumControllers = require('../controllers/album');

const router = express.Router();

router.post('/artists/:artistId/albums', ablbumControllers.createAlbum);

router.get('/albums', ablbumControllers.listAlbums);

router.get('/artists/:artistId/albums', ablbumControllers.findByArtistId);

//router.get(`/artists/:artistId/albums/:albumId`, ablbumControllers.findOneById);

router.get(`/albums/:albumId`, ablbumControllers.findOneById);

router.get('/albums/find/name', ablbumControllers.findByAlbumName);

router.get('/albums/year', ablbumControllers.findByAlbumYear);

router.patch('/albums/:albumId', ablbumControllers.updateByAlbumId);

router.delete(`/artists/:artistId/albums/:albumId`, ablbumControllers.deleteByAlbumId);

router.delete(`/artists/albums/:albumId`, ablbumControllers.deleteByIdAndName);

router.delete('/artists/:artistId/albums', ablbumControllers.deleteByArtistId);


module.exports = router;