module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING, 
      allowNull: false, 
      validation: {
        notNull: {
          args: true,  
          msg: 'Please enter a song name', 
        },
        notEmpty: {
          args: true, 
          msg: 'The song name cannot be empty',
        },
      },
    },
  };

  const Song = sequelize.define('Song', schema);
  return Song;
};