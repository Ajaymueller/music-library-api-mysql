module.exports = (sequelize, DataTypes) => {
  const schema = {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
  };

  const Album = sequelize.define('Album', schema);
  return Album;
};