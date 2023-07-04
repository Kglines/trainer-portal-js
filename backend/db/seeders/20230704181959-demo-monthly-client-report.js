'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'MonthlyClientReports';
    return queryInterface.bulkInsert(options, [
      {
        userId: 3,
        month: 1,
        year: 2023
      },
      {
        userId: 3,
        month: 2,
        year: 2023
      },
      {
        userId: 3,
        month: 3,
        year: 2023
      },
      {
        userId: 3,
        month: 4,
        year: 2023
      },
      {
        userId: 3,
        month: 5,
        year: 2023
      },
      {
        userId: 4,
        month: 1,
        year: 2023
      },
      {
        userId: 4,
        month: 2,
        year: 2023
      },
      {
        userId: 4,
        month: 3,
        year: 2023
      },
      {
        userId: 4,
        month: 4,
        year: 2023
      },
      {
        userId: 2,
        month: 4,
        year: 2023
      },
      {
        userId: 2,
        month: 5,
        year: 2023
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'MonthlyClientReports'
    return queryInterface.bulkDelete(options, null, {})
  }
};
