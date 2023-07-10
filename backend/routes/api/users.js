// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, MonthlyClientReport } = require('../../db/models');
const { validateSignup } = require('../../utils/validation');
const router = express.Router();

router.get('', requireAuth, async (req, res) => {
  
  const users = await User.findAll({
    attributes: [
      'id',
      'username',
      'firstname',
      'lastname',
      'email',
      'isAdmin',
      'profileImg'
    ],
    order: [
      ['lastname']
    ]
  });

  res.json({ users });
})

router.get('/monthly-client-reports', requireAuth, async (req, res) => {
  
  const users = await User.findAll({
    attributes: [
      'id',
      'username',
      'firstname',
      'lastname',
      'email',
      'isAdmin',
      'profileImg',
    ],
    include: [
      {
        model: MonthlyClientReport,
      },
    ],
    where: {
      isAdmin: false
    }
  });

//   const usersGrid = () => {
//     const res = {};
//     users.forEach((user) => {
//     return user.MonthlyClientReports.forEach((report) => {
//       for (let i = 1; i <= 12; i++) {
//         if (res[i] === undefined || res[i] === null && i === report.dataValues.month) {
//           res[i] = report.month;
//         } else {
//           res[i] = null;
//         }
//       }
//     });
//   })
//   return res;
// };

  // console.log('*********************** ', usersGrid())

  res.json({ users })
})

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, firstname, lastname, hashedPassword, profileImg, isAdmin });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      profileImg: user.profileImg,
      isAdmin: user.isAdmin
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

module.exports = router;
