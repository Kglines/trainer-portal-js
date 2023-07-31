'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'MonthlyReportDetails';
    return queryInterface.bulkInsert(options, [
      {
        monthlyClientReportId: 1,
        clientId: 1,
        isActive: true,
      },
      {
        monthlyClientReportId: 1,
        clientId: 4,
        isActive: true,
      },
      {
        monthlyClientReportId: 1,
        clientId: 6,
        isActive: false,
        notes: 'This is a note for client 6'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'MonthlyReportDetails';
    return queryInterface.bulkDelete(options, null, options);
  }
};
