module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING, 
      allowNull: false, 
      validation: {
        notNull: {
          args: true,
          msg: 'Please enter an artist name',
        }, 
        notEmpty: {
          args: true,
          msg: 'Artist name cannot be null',
        },
      }
    },
    genre: DataTypes.STRING,
  };

  const Artist = sequelize.define('Artist', schema);
  return Artist;
};