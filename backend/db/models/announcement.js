'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Announcement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Announcement.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Announcement.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    ,
  }
  }, {
    sequelize,
    modelName: 'Announcement',
  });
  return Announcement;
};
