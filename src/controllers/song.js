const { Album } = require('../sequelize');
const { Song } = require('../sequelize');
const { Op } = require("sequelize");
const { getAllItems, findItemById, findItemByName, updateModel, deleteItemById } = require('./helpers');

exports.createSong = async (req, res) => {
  const  { albumId } = req.params;
  const { artist } = req.body;
  const album = await Album.findByPk(albumId);

  !album ?
  res.status(404).json({ error: 'The album could not be found.' })
  : Song.create(req.body).then(createdSong => {
    createdSong.setAlbum(Number(albumId)).then(linkedSong => {
      linkedSong.setArtist(artist).then(finalSong => {
        res.status(201).json(finalSong);
      });
  });
})
.catch((error) => {
  const errorMessages = error.errors.map((e) => e.message);
  return res.status(400).json({ errors: errorMessages});
});
};

exports.findAllSongsByAlbumId = async (req, res) => {
  const { albumId } = req.params; 
  const songs = await Song.findAll({where: { albumId: albumId }});
  songs.length < 1 ? 
  res.status(404).json({ error: 'The song could not be found.'}) 
  : res.status(200).json(songs);
};


exports.findSongContainingWord = async (req, res) => {
  const { name } = req.query;
  const songs = await Song.findAll({ where: { name: { [Op.like]: `%${name}%` }}});
   songs < 1 ? res.status(404).json({ error: 'The song could not be found.'})
  : res.status(200).json(songs);
};

exports.findSongByArtistId = async (req, res) => {
  const { artistId } = req.params;
  const songs = await Song.findAll({ where: { artistId: artistId }})
   songs.length  < 1 ?
    res.status(404).json({ error: 'The song could not be found.'}) 
    : res.status(200).json(songs);
};

exports.listSongs = async (req, res) => getAllItems(res, 'song');

exports.findSongBySongId = async (req, res) => findItemById (res, 'song', req.params.songId);

exports.findBySongName = async (req, res) => findItemByName (res, 'song', req.query.name);

exports.updateSongBySongId = async (req, res) => updateModel(res, 'song', req.body, req.params.songId);

exports.deleteSongBySongId = async (req, res) => deleteItemById (res, 'song', req.params.songId);
