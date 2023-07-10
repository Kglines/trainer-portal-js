'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Machines';
    return queryInterface.bulkInsert(options, [
      {
        number: 1,
        type: 'cardio',
        manufacturer: 'Precor',
        name: 'treadmill',
        machineImg: ''
      },
      {
        number: 2,
        type: 'cardio',
        manufacturer: 'Precor',
        name: 'treadmill',
        machineImg: ''
      },
      {
        number: 3,
        type: 'cardio',
        manufacturer: 'Precor',
        name: 'treadmill',
        machineImg: ''
      },
      {
        number: 4,
        type: 'cardio',
        manufacturer: 'Precor',
        name: 'treadmill',
        machineImg: ''
      },
      {
        number: 5,
        type: 'cardio',
        manufacturer: 'Precor',
        name: 'treadmill',
        machineImg: ''
      },
      {
        number: 17,
        type: 'strength',
        manufacturer: 'Hammer-Strength',
        name: 'Chest Press',
        machineImg: ''
      },
      {
        number: 19,
        type: 'strength',
        manufacturer: 'Hammer-Strength',
        name: 'High Row',
        machineImg: ''
      },
    ])
    
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Machines';
    return queryInterface.bulkDelete(options, null, {});
  }
};
