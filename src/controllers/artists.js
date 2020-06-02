const { Artist } = require('../sequelize');
const { getAllItems, createItem, findItemById, findItemByName, findItemByGenre} = require('./helpers');
const { Op } = require("sequelize");

exports.createArtist = async (req, res) => createItem (res, 'artist', req.body);

exports.listArtists = (req, res) => getAllItems (res, 'artist');

exports.findByArtistId = async (req, res) => findItemById (res, 'artist', req.params.id);

exports.findByArtistName = async (req, res) => findItemByName (res, 'artist', req.query.name);

exports.findByArtistGenre = async (req, res) => findItemByGenre (res, 'artist', req.query.genre);

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