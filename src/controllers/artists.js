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
  const name = req.params.name;
  Artist.findAll({ where: { name: name }}).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(artist);
    };
  });
};

exports.updateGenre = (req, res) => {
  const id = req.params.id;
  Artist.update(req.body, { where: { id } }).then(([rowsUpdated]) => {
    if (!rowsUpdated) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
};

exports.updateName = (req, res) => {
  const id = req.params.id;
  Artist.update(req.body, { where: { id }}).then(([rowsUpdated]) => {
    if (!rowsUpdated) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
};

exports.deleteArtist = (req, res) => {
  const id = req.params.id;
  Artist.destroy({ where: { id }}).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(204).json(artist);
    }
  });
};