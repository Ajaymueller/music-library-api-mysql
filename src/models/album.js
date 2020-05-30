module.exports = (sequelize, DataTypes) => {
  const schema = {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validation: {
          notNull: {
            args: true,
            msg: 'Please enter an album name',
          },
          notEmpty: {
           args: true,
           msg: 'The album name cannot be empty',
          },
        },
      },
      year: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        validation: {
          notNull: {
            args: true,
            msg: 'Please enter an album year',
          },
          notEmpty: {
            args: true,
            msg: 'The album year cannot be empty'
          },
        },
          isInt: {
          args: false, 
          msg: 'The album year must be a number'
        },
      },
  };

  const Album = sequelize.define('Album', schema);
  return Album;
};