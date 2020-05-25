const { Artist } = require('../sequelize');

exports.createArtist = (req, res) => {
  Artist.create(req.body).then(user => res.status(201).json(user));
};

exports.listArtists = (req, res) => {
  Artist.findAll({ where: {}}).then(artists => res.status(200).json(artists));
};

exports.findByArtistId = (req, res) => {
  const { id } = req.params;
  Artist.findOne({ where: { id } }).then(artist => {
    ! artist ? res.status(404).json({ error: 'The artist could not be found.' })
    : res.status(200).json(artist);
  });
};

exports.findByArtistName = (req, res) => {
  const { name } = req.query;
  Artist.findAll({ where: { name: name }}).then(artists => {
    const artistData = artists.find(artist => artist.name === name)
    artistData ? 
    res.status(200).json(artistData)
    : res.status(404).json({ error: 'The artist could not be found.' })
  });
};

exports.findByArtistGenre = (req, res) => {
  const { genre } = req.query; 
  Artist.findAll({ where: { genre: genre }}).then(artists => {
    const artistData = artists.find(artist => artist.genre === genre)
    artistData ?
    res.status(200).json(artistData)
    : res.status(404).json({ error: 'The artist could not be found.' })
});
};

exports.updateArtistGenre = (req, res) => {
  const { id } = req.params;
  Artist.update(req.body, { where: { id }}).then(([rowsUpdated]) => {
    !rowsUpdated ? res.status(404).json({ error: 'The artist could not be found.' })
    : res.status(200).json(rowsUpdated);
  });
};

exports.updateArtistName = (req, res) => {
  const { id } = req.params;
  Artist.update(req.body, { id }).then(([rowsUpdated]) => {
    !rowsUpdated ? res.status(404).json({ error: 'The artist could not be found.' })
    : res.status(200).json(rowsUpdated);
  });
};

exports.deleteArtistByArtistId = (req, res) => {
  const { id } = req.params;
  Artist.destroy({ where: { id }}).then(artist => {
    !artist ? res.status(404).json({ error: 'The artist could not be found.' })
    : res.status(204).json(artist)
  })
};