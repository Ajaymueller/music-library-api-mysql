const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');

exports.create = async (req, res) => {
  const artistId = req.params.artistId;

  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      Album.create(req.body).then(album => {
        album.setArtist(artistId).then(linkedAlbum => {
          res.status(201).json(linkedAlbum);
        });
      });
    }
  });
};

exports.findById = async (req, res) => {
  const artistId = req.params.artistId;
  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist and album could not be found.' });
    } else {
      Album.findAll({ where: { artistId } })
      .then(album => res.status(200).json(album)).catch(error => console.log(error))
    }
    });
}