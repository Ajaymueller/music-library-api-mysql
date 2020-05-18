const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');
const { Song } = require('../sequelize');

/*exports.create = async (req, res) => {
  const albumId = req.params.albumId;
  const artistId = req.body.artist;
      Song.create(req.body).then(song => {
        song.setAlbum(Number(albumId)).then((albumSong) => albumSong.setArtist(artistId)).then(linkedSong => {
          res.status(201).json(linkedSong);
        })
      })
    }*/

exports.create = async (req, res) => {
  const albumId = req.params.albumId;
  const artistId = req.body.artist;
 try {
  const createSong = await Song.create(req.body);
  const song = await createSong.setAlbum(Number(albumId));
  const albumSong = awaitsong.setArtist(artistId);
  res.status(201).json(albumSong);
} catch(error) {
  console.log(error);
} 
};

/*exports.create = async (req, res) => {
  const albumId = req.params.albumId;
  const songData = {
    name: req.body.name,
    albumId: Number(albumId),
    artistId: req.body.artist
  };
  Song.create(songData).then((song) => {
    res.status(201).json(song);
  });
};*/