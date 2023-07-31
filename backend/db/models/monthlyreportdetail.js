'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonthlyReportDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MonthlyReportDetail.init({
    monthlyClientReportId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 100]
      }
    }
  }, {
    sequelize,
    modelName: 'MonthlyReportDetail',
  });
  return MonthlyReportDetail;
};
