'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Machine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Machine.hasMany(models.Maintenance, { foreignKey: 'machineId' })
    }
  }
  Machine.init({
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    machineImg: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Machine',
  });
  return Machine;
};
