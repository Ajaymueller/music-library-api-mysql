const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');
const { Song } = require('../sequelize');

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

exports.listSongs = async (req, res) => {
  const songs = await Song.findAll({where: {} })
  res.status(200).json(songs);
};

exports.findAllSongsByAlbumId = async (req, res) => {
  const { albumId } = req.params; 
  const songs = await Song.findAll({where: { albumId: albumId }});
  songs.length < 1 ? 
  res.status(404).json({ error: 'The song could not be found.'}) 
  : res.status(200).json(songs);
};

exports.findSongBySongId = async (req, res) => {
  const { songId } = req.params; 
  const song = await Song.findByPk(songId)
    ! song ? res.status(404).json({ error: 'The song could not be found.'})
    : res.status(200).json(song);
};

exports.findBySongName = async (req, res) => {
  const { name } = req.query;
  Song.findAll({where: { name: name }}).then(songs => {
    const songData = songs.filter(song => song.name === name)
     songData < 1 ? 
    res.status(404).json({ error: 'The song could not be found.'})
    : res.status(200).json(songData);
  });
};

exports.findSongByArtistId = async (req, res) => {
  const { artistId } = req.params;
  const songs = await Song.findAll({ where: { artistId: artistId }})
   songs.length  < 1 ?
    res.status(404).json({ error: 'The song could not be found.'}) 
    : res.status(200).json(songs);
};

exports.updateSongBySongId = async (req, res) => {
  const { songId } = req.params;
const song = await Song.findByPk(songId)
! song ? res.status(404).json({ error: 'The song could not be found.'})
: song.update(req.body, { where: {id: songId}}).then(updatedSong => {
  res.status(200).json(updatedSong);
});
}

exports.deleteSongBySongId = async (req, res) => {
  const { songId } = req.params; 
const song = await Song.findByPk(songId);
! song ? res.status(404).json({ error: 'The song could not be found.'})
: Song.destroy({where: { id: songId }}).then(destroyedSong => {
  res.status(204).json(destroyedSong);
});
};
