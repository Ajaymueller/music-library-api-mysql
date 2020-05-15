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

/*exports.findById = (req, res) => {
  const id = req.params.id;
  Album.findAll({ include: [ { model: Artist, as: 'artist', where: { id }}]}).then(albums => res.status(200).json(albums));
}; */

/*exports.findById = (req, res) => {
  const id = req.params.id;
  Album.findAll({
    include: [{
      model: Artists,
      as: 'artist', 
      where: { id }
    }]
  })
  .then(albums => res.status(200).json(albums))
  .catch(console.error)
}; */

exports.findById = (req, res) => {
  let query;
  if(req.params.artistId) {
      query = Album.findAll({ include: [
          { model: Artist, as: 'artist', where: { id: req.params.artistId } }
      ]}); return query.then(albums => res.json(albums)) 
  } else {
    res.status(404).json({ error: 'The artist could not be found.' });
  }
}