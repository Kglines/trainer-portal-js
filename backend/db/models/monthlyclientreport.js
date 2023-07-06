'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonthlyClientReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      MonthlyClientReport.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  MonthlyClientReport.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [4, 4]
      }
    }
  }, {
    sequelize,
    modelName: 'MonthlyClientReport',
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['month', 'year']
    //   }
    // ]
  });
  return MonthlyClientReport;
};
