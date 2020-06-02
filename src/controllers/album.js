const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');
const { getAllItems, findItemById, findItemByArtistId, findItemByName, findItemByYear, updateModel, deleteItemById, deleteAlbumByIdAndName } = require('./helpers');

exports.createAlbum = async (req, res) => {
  const { artistId } = req.params;
  const artist = await Artist.findByPk(artistId);
 ! artist ? res.status(404).json({ error: 'The artist could not be found.' }) 
    : Album.create(req.body).then(album => {
      album.setArtist(artistId).then(linkedAlbum => {
        res.status(201).json(linkedAlbum); 
  })
})
.catch((error) => {
  const errorMessages = error.errors.map((e) => e.message);
  return res.status(400).json({ errors: errorMessages});
})
};

exports.findByArtistId = async (req, res) => {
  const { artistId } = req.params;
  const artist = await Artist.findByPk(artistId)
  !artist ? 
  res.status(404).json({ error: 'The artist and album could not be found.' })
  : Album.findAll({ where: { artistId } })
  .then(album => res.status(200).json(album))
};

exports.findAlbumFromBeforeYear = async (req, res) => {
  const { year } = req.query;
  const albums = await Album.findAll({});
  const albumData = await albums.filter(album => album.year < year);
  albumData < 1 ?
  res.status(404).json({ error: 'The album could not be found.'})
  : res.status(200).json(albumData);
};

exports.deleteByArtistId = async (req, res) => {
  const { artistId } = req.params;
  const album = await Album.destroy({ where: { artistId: artistId }})
  ! album ? 
  res.status(404).json({ error: 'The album could not be found.' })
  : res.status(204).json(album) 
};


exports.listAlbums = async (req, res) => getAllItems(res, 'album');

exports.findOneById = async (req, res) => findItemById (res, 'album', req.params.albumId);

exports.findByAlbumName = async (req, res) => findItemByName(res, 'album', req.query.name);

exports.findByAlbumYear = async (req, res) => findItemByYear (res, 'album', req.query.year);

exports.updateByAlbumId = async (req, res) => updateModel (res, 'album', req.body, req.params.albumId);

exports.deleteByAlbumId = async (req, res) => deleteItemById (res, 'album', req.params.albumId);

exports.deleteByIdAndName = async (req, res) => deleteAlbumByIdAndName (res, 'album', req.query.name, req.params.albumId);