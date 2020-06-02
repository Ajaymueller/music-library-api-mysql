const { Artist } = require('../sequelize');
const { Album } = require('../sequelize');
const { Song } = require('../sequelize');

const getModel = (model) => {
  const models = {
    artist: Artist,
    album: Album,
    song: Song,
  };

  return models[model];
};

exports.getAllItems = async (res, model) => {
  const Model = getModel(model);
  const allItems = await Model.findAll({});
  res.status(200).json(allItems);
};

exports.createItem = async (res, model, item) => {
  const Model = getModel(model);

  try {
    const newItem = await Model.create(item)
    res.status(201).json(newItem);
  } catch (error) {
    const errorMessages = await error.errors.map((e) => e.message);
    res.status(400).json({ error: errorMessages });
  }
}

exports.findItemById = async (res, model, id) => {
  const Model = getModel(model);

  const foundItem = await Model.findByPk(id)
  ! foundItem ?
  res.status(404).json({ error: `The ${model} could not be found.` })
  : res.status(200).json(foundItem);
};

exports.findItemByName= async (res, model, name) => {
  const Model = getModel(model);

  const items = await Model.findAll({ where: { name }})
  items.length < 1 ?
  res.status(404).json({ error: `The ${model} could not be found.` })
  : res.status(200).json(items)
};

exports.findItemByGenre = async (res, model, genre) => {
  const Model = getModel(model);

  const items = await Model.findAll({ where: { genre }})
  items.length < 1 ? 
  res.status(404).json({ error: `The ${model} could not be found.` })
  : res.status(200).json(items)
};

exports.updateModel = async (res, model, item, id ) => {
  const Model = getModel(model);

  const updatedItem = await Model.update(item, { where: { id }});
  updatedItem < 1 ? res.status(404).json({ error: `The ${model} could not be found.` })
  :  res.status(200).json(updatedItem);
}

exports.deleteItemById = async (res, model, id) => {
  const Model = getModel(model);

  const destroyedItem = await Model.destroy({ where: { id }});
  ! destroyedItem ? 
  res.status(404).json({ error: `The ${model} could not be found.`  })
  : res.status(204).json(destroyedItem)
}

exports.deleteAlbumByIdAndName = async (res, model, name, id) => {
  const Model = getModel(model);

  Model.findByPk(id).then(item => {
    ! item ? res.status(404).json({ error: `The ${model} could not be found.`})
    : name === item.name ? Model.destroy({ where: { name }}).then(destroyedItem => res.status(204).json(destroyedItem))
    : res.status(404).json({ error: `The ${model} could not be found.`})
  });

}

exports.findItemByYear = async (res, model, year) => {
  const Model = getModel(model);

  const items = await Model.findAll({ where: { year }})
  items.length < 1 ?
  res.status(404).json({ error: `The ${model} could not be found.` })
  : res.status(200).json(items)
}