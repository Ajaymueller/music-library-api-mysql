const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');
const { Song } = require('../sequelize');
//const Op = Sequelize.Op;

exports.create = async (req, res) => {
  const  { albumId } = req.params;
  const { artist } = req.body;
 try {
  const createSong = await Song.create(req.body);
  const song = await createSong.setAlbum(Number(albumId));
  const albumSong = await song.setArtist(artist);
  res.status(201).json(albumSong);
} catch(error) {
  console.log(error);
} 
};

exports.listSongs = async (req, res) => {
  Song.findAll({where: {}}).then(songs => res.status(200).json(songs));
};

exports.findAllById = async (req, res) => {
  const { albumId } = req.params; 
  await Album.findByPk(albumId).then(album => {
    ! album ? res.status(404).json({ error: 'The album could not be found.' })
    : Song.findAll({ where: { albumId: albumId }}).then(song => res.status(200).json(song));
  });
};

exports.findOneById = async (req, res) => {
  const { songId } = req.params; 
  await Song.findByPk(songId).then(song => {
    ! song ? res.status(404).json({ error: 'The song could not be found.'})
    : res.status(200).json(song);
  });
};

/*exports.getSongWithSpecificName = async (req, res) => {
  await Song.findAll({ where: { name: {[Op.like]: req.query}}})
};*/

exports.update = async (req, res) => {
  const { songId } = req.params;
  await Song.findByPk(songId).then(song => {
    ! song ? res.status(404).json({ error: 'The song could not be found.'})
      : song.update(req.body, { where: {id: songId}}).then(updatedSong => {
        res.status(200).json(updatedSong);
  });
});
};

exports.delete = async (req, res) => {
  const { songId } = req.params; 
  await Song.findByPk(songId).then(song => {
    ! song ? res.status(404).json({ error: 'The song could not be found.'})
    : song.destroy({where: { id: songId }}).then(destroyedSong => {
      res.status(204).json(destroyedSong);
    })
})
}