const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');

exports.create = async (req, res) => {
  const { artistId } = req.params;
  const artist = await Artist.findByPk(artistId);
 ! artist ? res.status(404).json({ error: 'The artist could not be found.' }) 
    : Album.create(req.body).then(album => {
      album.setArtist(artistId).then(linkedAlbum => {
        res.status(201).json(linkedAlbum); 
  })
})
};

exports.list = async (req, res) => {
  Album.findAll({ where: {}}).then(albums => res.status(200).json(albums));
};

exports.findById = async (req, res) => {
  const { artistId } = req.params;
  await Artist.findByPk(artistId).then(artist => {
    ! artist ? res.status(404).json({ error: 'The artist and album could not be found.' })
    : Album.findAll({ where: { artistId } })
    .then(album => res.status(200).json(album))
  });
};

exports.findOneById = async (req, res) => {
  const { albumId } = req.params;
  const { artistId } = req.params;
  await Artist.findByPk(artistId).then(artist => {
    ! artist ? res.status(404).json({ error: 'The artist and album could not be found.' })
    : Album.findByPk(albumId).then(album => {
      ! album ? res.status(404).json({ error: 'The artist and album could not be found.' })
      : res.status(200).json(album)
    });
  });
};

exports.updateById = async (req, res) => {
  const { albumId } = req.params;
  await Album.findByPk(albumId).then(album => {
      ! album ? res.status(404).json({ error: 'The album could not be found.' })
      : Album.update(req.body, { where: { id: albumId} } )
      .then(updatedAlbum => res.status(200).json(updatedAlbum))
    });
  };

exports.deleteById = async (req, res) => {
    const { artistId } = req.params;
    const { albumId } = req.params;
    await Artist.findByPk(artistId).then(artist => {
      ! artist ? res.status(404).json({ error: 'The artist and album could not be found.' })
      : Album.findByPk(albumId).then(album => {
        ! album ? res.status(404).json({ error: 'The album could not be found.' })
        : Album.destroy({ where: { id: albumId} } )
        .then(destroyedAlbum => res.status(204).json(destroyedAlbum))
      }); 
  });
};


  exports.deleteByIdAndName = async (req, res) => {
    const { albumId } = req.params;
    const { name } = req.query;
    Album.findByPk(albumId).then(album => {
      ! album ? res.status(404).json({ error: 'The album could not be found.' })
      : name === album.name ? Album.destroy({ where: { name: name }}).then(destroyedAlbum => res.status(204).json(destroyedAlbum))
      : res.status(404).json({ error: 'The album could not be found.'})
    });
  };

  exports.deleteByArtistId = async (req, res) => {
    const { artistId } = req.params;
    Artist.findByPk(artistId).then(artist => {
      ! artist ? res.status(404).json({ error: 'The album could not be found.' })
      : artistId === Album.artistId ? 
      Album.destroy({ where: { artistId: artistId }}).then(destroyedAlbum => res.status(204).json(destroyedAlbum))
      : res.status(404).json({ error: 'The album could not be found.'})
    });
  };