'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: 'margiroudis@hachealthclub.com',
          username: 'Maria-admin',
          firstname: 'Maria',
          lastname: 'Crennan',
          hashedPassword: bcrypt.hashSync('password'),
          isAdmin: true,
          profileImg:
            'https://d2x1db8y31vprb.cloudfront.net/profile-pic/19805.jpg',
        },
        {
          email: 'bbaldwin@hachealthclub.com',
          username: 'Bridget-admin',
          firstname: 'Bridget',
          lastname: 'Baldwin',
          hashedPassword: bcrypt.hashSync('password'),
          isAdmin: false,
          profileImg:
            'https://static.wixstatic.com/media/c23b39_447a0d5e8bb3447d8351def20f8a77c5~mv2.jpg/v1/fill/w_640,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c23b39_447a0d5e8bb3447d8351def20f8a77c5~mv2.jpg',
        },
        {
          email: 'keithglines@yahoo.com',
          username: 'Keith-admin',
          firstname: 'Keith',
          lastname: 'Glines',
          hashedPassword: bcrypt.hashSync('password'),
          isAdmin: true,
          profileImg:
            'https://static.wixstatic.com/media/b098cf_75c69c6d47ae42bc84aa3f8d3b439db2~mv2_d_2100_1400_s_2.jpg/v1/fill/w_640,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b098cf_75c69c6d47ae42bc84aa3f8d3b439db2~mv2_d_2100_1400_s_2.jpg',
        },
        {
          email: 'deweylightcap@gmail.com',
          username: 'Dewey',
          firstname: 'Dewey',
          lastname: 'Lightcap',
          hashedPassword: bcrypt.hashSync('password'),
          isAdmin: false,
          profileImg:
            'https://i0.wp.com/hachealthclub.blog/wp-content/uploads/2020/02/DSC_5243_edit.jpg?fit=1200%2C800&ssl=1',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] },
      },
      {}
    );
  },
};
