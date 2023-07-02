'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
};


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Announcements';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        month: 6,
        body: '6/30 - June is wrapping up...',
      },
      {
        userId: 1,
        month: 7,
        body: '7/4 - Happy 4th of July!',
      },
      {
        userId: 1,
        month: 7,
        body: "7/5 - It's no longer the fourth of July. Everyone feels bloated from eating and drinking too much. Did you see fireworks?",
      },
      {
        userId: 1,
        month: 7,
        body: '7/12 - Somebody has probably had a birthday by now, so Happy Birthday!',
      },
      {
        userId: 1,
        month: 7,
        body: "7/15 - We're half way through the month...what have you done for me lately?!",
      },
      {
        userId: 1,
        month: 7,
        body: "7/18 - Maybe there's more than one July birthday, so Happy Birthday to this person too!",
      },
      {
        userId: 1,
        month: 7,
        body: "7/25 - We're in the last week of the month...make sure your clients renew soon!",
      },
      {
        userId: 1,
        month: 7,
        body: '7/31 - August starts tomorrow.',
      },
      {
        userId: 1,
        month: 8,
        body: '8/1 - August starts now.',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Announcements';
    return queryInterface.bulkDelete(options, null, {})
  }
};
