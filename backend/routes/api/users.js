// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, MonthlyClientReport } = require('../../db/models');
const { validateSignup } = require('../../utils/validation');
const router = express.Router();

// GET all Users, ordered by last name
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

// GET a specific User
router.get('/:userId', requireAuth, async (req, res) => {
  const { userId } = req.params;
  const today = new Date()
  const thisYear = today.getFullYear();
  const user = await User.findByPk(userId, {
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
      }
    ],
  });

  res.json({ user });
})

// GET Users monthly reports
router.get('/:userId/monthly-client-reports', requireAuth, async (req, res) => {
  const { userId } = req.params;
  
  const userReports = await User.findByPk(userId, {
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

  res.json({ userReports })
})

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstname, lastname, profileImg, isAdmin } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, firstname, lastname, hashedPassword, profileImg, isAdmin });
    console.log('************************************* ', user)
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
