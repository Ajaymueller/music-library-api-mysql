const { Artist } = require('../sequelize');
const { Album } = require('../sequelize');
const { Song } = require('../sequelize');

const getModel = (model) => {
  const models = {
    '/artists': Artist,
    '/albums': Album,
    '/songs': Song,
  };

  return models[model];
};

exports.getAllItems = (req, res) => {
  const Model = getModel(req.url);

  return Model.findAll().then((allItems) => {
    res.status(200).json(allItems);
  });
};
