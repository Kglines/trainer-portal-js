'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Clients';
    return queryInterface.bulkInsert(options, [
      {
        userId:3,
        firstname: 'Llyn',
        lastname: 'Balakhani',
        isActive: true
      },
      {
        userId: 4,
        firstname: 'Lori',
        lastname: 'Almazora',
        isActive: true
      },
      {
        userId: 4,
        firstname: 'Pat',
        lastname: 'Thrasher',
        isActive: true
      },
      {
        userId: 3,
        firstname: 'Betty',
        lastname: 'Ingram',
        isActive: true
      },
      {
        userId: 3,
        firstname: 'Bruce',
        lastname: 'Fay',
        isActive: true
      },
      {
        userId: 3,
        firstname: 'Sophie',
        lastname: 'Hershey',
        isActive: false
      },
      {
        userId: 4,
        firstname: 'Rob',
        lastname: 'Alzamora',
        isActive: true
      },
      {
        userId: 4,
        firstname: 'Gabby',
        lastname: 'Unknown',
        isActive: false
      },
      {
        userId: 3,
        firstname: 'Pedro',
        lastname: 'Toala',
        isActive: true
      },
      {
        userId: 3,
        firstname: 'Kathryn',
        lastname: 'Fish',
        isActive: false
      },
      {
        userId: 3,
        firstname: 'Dick',
        lastname: 'Powers',
        isActive: true
      },
      {
        userId: 2,
        firstname: 'Wendy',
        lastname: 'Unknown',
        isActive: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Clients';
    return queryInterface.bulkDelete(options, null, {});
  }
};
