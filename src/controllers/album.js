const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');

exports.create = async (req, res) => {
  const artistId = req.params.artistId;

  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      Album.create(req.body).then(album => {
        album.setArtist(artistId).then(linkedAlbum => {
          res.status(201).json(linkedAlbum);
        });
      });
    }
  });
};

exports.findById = async (req, res) => {
  const artistId = req.params.artistId;
  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist and album could not be found.' });
    } else {
      Album.findAll({ where: { artistId } })
      .then(album => res.status(200).json(album)).catch(error => console.log(error))
    }
    });
}

exports.findOneById = async (req, res) => {
  const albumId = req.params.albumId;
  const artistId = req.params.artistId;
  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist and album could not be found.' });
    } else {
      Album.findByPk(albumId).then(album => {
        if (!album) {
          res.status(404).json({ error: 'The artist and album could not be found.' });
        } else {
          res.status(200).json(album)
        }
      })
    }
    });
  }
  

exports.updateById = async (req, res) => {
  const artistId = req.params.artistId;
  const albumId = req.params.albumId;
  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist and album could not be found.' });
    } else {
      Album.findByPk(albumId).then(album => {
        if (!album) {
          res.status(404).json({ error: 'The album could not be found.' });
        } else {
          Album.update(req.body, { where: { id: albumId} } )
          .then(updatedAlbum => res.status(200).json(updatedAlbum))
        }

        })
  }
})
}

exports.updateByArtistId = async (req, res) => {
  const artistId = req.params.artistId;
  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist and album could not be found.' });
    } else {
      Album.update( req.body, { where: { artistId: artistId }}).then(([updatedAlbum]) => {
        if (!updatedAlbum) {
          res.status(404).json({ error: 'The album could not be found.' });
        } else {
          res.status(200).json(updatedAlbum);
    }
})
};
  })
}

  

/*exports.deleteById = async (req, res) => {
  const artistId = req.params.artistId;
  Album.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist and album could not be found.' });
    } else {
      Album.destroy({ where: { artistId }}).then(album => res.status(204).json(album));
    }
})
}*/

/*Album.findAll({ where: { artistId }})
      .then(() => Album.update({year}, { where: { artistId }}))
      .then((updatedAlbum) => res.status(200).json(updatedAlbum));
*/

exports.deleteById = async (req, res) => {
  const artistId = req.params.artistId;
  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist and album could not be found.' });
    } else {
      Album.findAll({ where: { artistId }})
      .then(() => Album.destroy({ where: { artistId }}))
      .then(album => res.status(204).json(album))
    }
  })
  }

  exports.deleteById = async (req, res) => {
    const artistId = req.params.artistId;
    const albumId = req.params.albumId;

  }

  exports.deleteById = async (req, res) => {
    const artistId = req.params.artistId;
    const albumId = req.params.albumId;
    Artist.findByPk(artistId).then(artist => {
      if (!artist) {
        res.status(404).json({ error: 'The artist and album could not be found.' });
      } else {
        Album.findByPk(albumId).then(album => {
          if (!album) {
            res.status(404).json({ error: 'The album could not be found.' });
          } else {
            Album.destroy({ where: { id: albumId} } )
            .then(destroyedAlbum => res.status(204).json(destroyedAlbum))
          }
  
          })
    }
  })
  }

  exports.deleteByIdAndName = async (req, res) => {
    const albumId = req.params.albumId;
    const name = req.query.name;
    Album.findByPk(albumId).then(artist => {
      if (!artist) {
        res.status(404).json({ error: 'The artist and album could not be found.' });
      } else {
            Album.destroy({ where: { name: name } } )
            .then(destroyedAlbum => res.status(204).json(destroyedAlbum))
          }
          })
    }
