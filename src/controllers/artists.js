const { Artist } = require('../sequelize');
const { getAllItems } = require('./helpers');
const { Op } = require("sequelize");

exports.createArtist = async (req, res) => {
  try {
    const user = await Artist.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    const errorMessages = await error.errors.map((e) => e.message);
    return res.status(400).json({ errors: errorMessages});
  };
};

exports.listArtists = async (req, res) => {
  const artists = await Artist.findAll({ where: {} });
  res.status(200).json(artists);
};

/*exports.listArtists = (req, res) => getAllItems (req, res);*/

exports.findByArtistId = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findOne({ where: { id } })
  ! artist ?
  res.status(404).json({ error: 'The artist could not be found.' })
  : res.status(200).json(artist);
  };

exports.findByArtistName = async (req, res) => {
  const { name } = req.query;
  const artists = await Artist.findAll({ where: { name: name }})
  artists.length < 1 ?
  res.status(404).json({ error: 'The artist could not be found.' })
  : res.status(200).json(artists);
};

exports.findByArtistGenre = async (req, res) => {
  const { genre } = req.query; 
  const artists = await Artist.findAll({ where: { genre: genre }});
  artists.length < 1 ?
  res.status(404).json({ error: 'The artist could not be found.' })
  : res.status(200).json(artists)
}

exports.findByFirstLetter = async (req, res) => {
  const { name } = req.query;
  const artists = await Artist.findAll({ where: { name: {[Op.startsWith]: `${name}%`}} });
  artists.length < 1 ? res.status(404).json({ error: 'The artist could not be found.' })
  : res.status(200).json(artists)
};

exports.updateArtistGenre = async (req, res) => {
  const { id } = req.params;
  await Artist.update(req.body, { where: { id: id }}).then(([rowsUpdated]) => {
    !rowsUpdated ? res.status(404).json({ error: 'The artist could not be found.' })
  :  res.status(200).json(rowsUpdated);
  });
};

exports.updateArtistName = async (req, res) => {
  const { id } = req.params;
  await Artist.update(req.body, { where: { id: id }}).then(([rowsUpdated]) => {
    !rowsUpdated ? res.status(404).json({ error: 'The artist could not be found.' })
  :  res.status(200).json(rowsUpdated);
  });
};

exports.deleteArtistByArtistId = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.destroy({ where: { id }});
  ! artist ?
  res.status(404).json({ error: 'The artist could not be found.' })
  : res.status(204).json(artist)
};