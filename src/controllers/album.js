const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');
const { getAllItems } = require('./helpers');
const { Op } = require("sequelize");

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

exports.listAlbums = async (req, res) => {
  const albums = await Album.findAll({ where: {}})
  res.status(200).json(albums);
};

//exports.listAlbums = (req, res) => getAllItems(res, req);

exports.findByArtistId = async (req, res) => {
  const { artistId } = req.params;
  const artist = await Artist.findByPk(artistId)
  !artist ? 
  res.status(404).json({ error: 'The artist and album could not be found.' })
  : Album.findAll({ where: { artistId } })
  .then(album => res.status(200).json(album))
};

exports.findOneById = async (req, res) => {
  const { albumId } = req.params;
  const album = await await Album.findByPk(albumId)
  ! album ? res.status(404).json({ error: 'The album could not be found.' })
  : res.status(200).json(album)
};

  exports.findByAlbumName = async (req, res) => {
    const { name } = req.query;
    const albums = await Album.findAll({ where: { name: name }})
    const albumData = await albums.filter(album => album.name === name);
        albumData < 1 ? 
        res.status(404).json({ error: 'The album could not be found.'})
        : res.status(200).json(albumData);
  }

  exports.findByAlbumYear = async (req, res) => {
    const { year } = req.query;
    const albums = await Album.findAll({ where: { year: Number(year) }})
    const albumData = await albums.filter(album => album.year === Number(year))
      albumData < 1 ?
      res.status(404).json({ error: 'The album could not be found.'})
      : res.status(200).json(albumData)
  };

  exports.findAlbumFromBeforeYear = async (req, res) => {
    const { year } = req.query;
    const albums = await Album.findAll({});
    const albumData = await albums.filter(album => album.year < year);
    albumData < 1 ?
    res.status(404).json({ error: 'The album could not be found.'})
    : res.status(200).json(albumData);
  };

exports.updateByAlbumId = async (req, res) => {
  const { albumId } = req.params;
  const album = await Album.findByPk(albumId)
  ! album ? res.status(404).json({ error: 'The album could not be found.' })
  : Album.update(req.body, { where: { id: albumId} } )
   .then(updatedAlbum => res.status(200).json(updatedAlbum))
};

exports.deleteByAlbumId = async (req, res) => {
  const { albumId } = req.params;
  const albums = await Album.findByPk(albumId);
  ! albums ? res.status(404).json({ error: 'The album could not be found.' })
  : Album.destroy({ where: { id: albumId} } )
  .then(destroyedAlbum => res.status(204).json(destroyedAlbum))
};


  exports.deleteByIdAndName = async (req, res) => {
    const { albumId } = req.params;
    const { name } = req.query;
    Album.findByPk(albumId).then(album => {
      ! album ? res.status(404).json({ error: 'The album could not be found.' })
      : name === album.name ? Album.destroy({ where: { name: name }}).then(destroyedAlbum => res.status(204).json(destroyedAlbum))
      : res.status(404).json({ error: 'The album could not be found.'})
    });
  };

  exports.deleteByArtistId = async (req, res) => {
    const { artistId } = req.params;
    const album = await Album.destroy({ where: { artistId: artistId }})
    ! album ? 
    res.status(404).json({ error: 'The album could not be found.' })
    : res.status(204).json(album) 
  };