const { Artist } = require('../models/artist');
const { Album } = require('../models/album');
const { Song } = require('../models/song');

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
