const express = require('express');
const albumControllers = require('../controllers/album');

const router = express.Router();


router.get('/albums/year', albumControllers.findByAlbumYear);

router.get('/albums/find/year', albumControllers.findAlbumFromBeforeYear);

router.get('/albums/find/name', albumControllers.findByAlbumName);

router.route('/artists/:artistId/albums')
.get(albumControllers.findByArtistId)
.post(albumControllers.createAlbum)
.delete(albumControllers.deleteByArtistId)

router.route(`/artists/albums/:albumId`)
.delete(albumControllers.deleteByIdAndName)

router.route(`/albums/:albumId`)
.get(albumControllers.findOneById)
.patch(albumControllers.updateByAlbumId)
.delete(albumControllers.deleteByAlbumId)

router.get('/albums', albumControllers.listAlbums);

module.exports = router;