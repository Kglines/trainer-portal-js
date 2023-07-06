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
        where: {
          userId: id
        }
      }
    ]
  });

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
