const { Artist } = require('../sequelize');

exports.create = (req, res) => {
  Artist.create(req.body).then(user => res.status(201).json(user));
};

exports.list = (req, res) => {
  Artist.findAll({ where: {}}).then(artists => res.status(200).json(artists));
};

exports.findById = (req, res) => {
  const { id } = req.params;
  Artist.findOne({ where: { id } }).then(artist => {
    ! artist ? res.status(404).json({ error: 'The artist could not be found.' })
    : res.status(200).json(artist);
  });
};

exports.findByName = (req, res) => {
  const { name } = req.query;
  Artist.findAll({ where: { name: name }}).then(artists => {
    const artistData = artists.find(artist => artist.name === name)
    artistData ? 
    res.status(200).json(artistData)
    : res.status(404).json({ error: 'The artist could not be found.' })
  });
};

exports.findByGenre = (req, res) => {
  const { genre } = req.query; 
  Artist.findAll({ where: { genre: genre }}).then(artists => {
    const artistData = artists.find(artist => artist.genre === genre)
    artistData ?
    res.status(200).json(artistData)
    : res.status(404).json({ error: 'The artist could not be found.' })
});
};

exports.updateGenre = (req, res) => {
  const { id } = req.params;
  Artist.update(req.body, { where: { id }}).then(([rowsUpdated]) => {
    !rowsUpdated ? res.status(404).json({ error: 'The artist could not be found.' })
    : res.status(200).json(rowsUpdated);
  });
};

exports.updateName = (req, res) => {
  const { id } = req.params;
  Artist.update(req.body, { id }).then(([rowsUpdated]) => {
    !rowsUpdated ? res.status(404).json({ error: 'The artist could not be found.' })
    : res.status(200).json(rowsUpdated);
  });
};

exports.deleteArtist = (req, res) => {
  const { id } = req.params;
  Artist.destroy({ where: { id }}).then(artist => {
    !artist ? res.status(404).json({ error: 'The artist could not be found.' })
    : res.status(204).json(artist)
  })
};