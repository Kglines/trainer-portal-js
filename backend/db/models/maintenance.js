'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Maintenance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Maintenance.belongsTo(models.Machine, { foreignKey: 'machineId' })
      Maintenance.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Maintenance.init(
    {
      machineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 200],
        },
      },
      isPending: {
        type: DataTypes.BOOLEAN,
      },
      isFixed: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'Maintenance',
    }
  );
  // const count = Maintenance.count()
  return Maintenance;
};
