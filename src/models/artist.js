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
    genre: {
      type: DataTypes.STRING,
      allowNull: false, 
      validation: {
        notNull: {
          args: true, 
          msg: 'Please enter a genre',
        },
        notEmpty: {
          args: true, 
          msg: 'Genre cannot be null',
        },
      }
    },
  };

  const Artist = sequelize.define('Artist', schema);
  return Artist;
};