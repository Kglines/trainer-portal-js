'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Maintenances';
    return queryInterface.bulkInsert(options, [
      {
        machineId: 1,
        userId: 4,
        title: 'TV not working',
        description: 'TV has static on most channels. Only two channels actually work.',
        isPending: true,
        isFixed: false
      },
      {
        machineId: 2,
        userId: 3,
        title: 'Belt squeaks',
        description: 'Treadmill has a squeaky belt.',
        isPending: true,
        isFixed: false
      },
      {
        machineId: 17,
        userId: 3,
        title: 'Grip',
        description: 'Grip is coming off.',
        isPending: true,
        isFixed: false
      },
      {
        machineId: 1,
        userId: 3,
        title: 'Elevation problem.',
        description: 'Elevation not working. Nothing happens when buttons are pushed.',
        isPending: true,
        isFixed: false
      },
      {
        machineId: 4,
        userId: 4,
        title: 'No sound.',
        description: 'No sound is coming through the ear phone jack.',
        isPending: true,
        isFixed: false
      },
      {
        machineId: 19,
        userId: 3,
        title: 'Vinyl ripped',
        description: 'The vinyl on the seat back is ripped.',
        isPending: true,
        isFixed: false
      },
      {
        machineId: 1,
        userId: 1,
        title: 'Display malfunction',
        description: "The display on the console doesn't work properly.",
        isPending: true,
        isFixed: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Maintenances';
    return queryInterface.bulkDelete(options, null, {});
  }
};
