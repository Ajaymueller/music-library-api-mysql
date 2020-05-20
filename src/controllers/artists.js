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

/*exports.findByName = (req, res) => {
  const { name } = req.query;
  Artist.findAll({ where: { name: name }}).then(artist => {
    if (name === artist.name) {
      res.status(200).json(artist); 
    } else {
      res.status(404).json({ error: 'The artist could not be found.' });
    };
  });
};*/
exports.findByName = (req, res) => {
  const { name } = req.query;
  Artist.findAll({ where: { name: name }}).then(artists => {
    const artistData = artists.find(artist => artist.name === name)
    console.log(artistData);
    if (artistData) {
      res.status(200).json(artist);
    } else {
      res.status(404).json({ error: 'The artist could not be found.' });
    };
  });
}

/*exports.findByName = (req, res) => {
  const { name } = req.query;
  const findArtist = await Artist.findAll({ where: { name: name }})
  Artist.findAll({ where: { name: name }}).then(artist => {
    ! artist ? res.status(404).json({ error: 'The artist could not be found.' })
    : res.status(200).json(artist);
  });
};*/

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