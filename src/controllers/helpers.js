const { Artist } = require('../sequelize');
const { Album } = require('../sequelize');
const { Song } = require('../sequelize');

/*const getModel = (model) => {
  const models = {
    '/artists': Artist,
    '/albums': Album,
    '/songs': Song,
  };

  return models[model];
};*/

const getModel = (model) => {
  const models = {
    artist: Artist,
    album: Album,
    song: Song,
  };

  return models[model];
};

exports.getAllItems = (res, model) => {
  const Model = getModel(model);

  return Model.findAll().then((allItems) => {
    res.status(200).json(allItems);
  });
};
