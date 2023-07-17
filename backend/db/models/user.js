'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Announcement, { foreignKey: 'userId' });
      User.hasMany(models.MonthlyClientReport, { foreignKey: 'userId' });
      User.hasMany(models.Client, { foreignKey: 'userId' });
      User.hasMany(models.Maintenance, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be email.');
            }
          },
        },
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 30],
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 30],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      profileImg: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
    }
  );
  return User;
};
