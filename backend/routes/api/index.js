// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const announcementsRouter = require('./announcements.js');
const clientsRouter = require('./clients.js');
const monthlyClientReportRouter = require('./monthlyClientReport.js');
const machineRouter = require('./machines.js');
const maintenanceRouter = require('./maintenance.js');
const reportDetailsRouter = require('./reportDetails.js');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/announcements', announcementsRouter);
router.use('/clients', clientsRouter);
router.use('/monthly-client-reports', monthlyClientReportRouter);
router.use('/machines', machineRouter);
router.use('/maintenance', maintenanceRouter);
router.use('/report-details', reportDetailsRouter);

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});

router.get('/restore-user', (req, res) => {
  return res.json(req.user);
});

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Maria-admin'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;
