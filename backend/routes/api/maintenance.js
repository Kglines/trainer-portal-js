const express = require('express');
const router = express.Router();
const { requireAuth } = '../../utils/auth';
const { Maintenance } = '../../db/models/';

// Get all maintenance reports
router.get('', requireAuth, async (req, res) => {
    const maintenance = await Maintenance.findAll()
    res.json({ maintenance });
})

router.post('', requireAuth, async (req, res) => {
    const { user } = req.params;
    const { machineId, title, description, isPending, isFixed } = req.body;

    const maintenance = await Maintenance.create({
        machineId,
        userId: user.id,
        title,
        description,
        isPending,
        isFixed
    })

    res.status(201);
    res.json(maintenance);
})

router.put('/:maintenanceId', requireAuth, async (req, res) => {
    const { maintenanceId } = req.params;
    const { userId, title, description, isPending, isFixed } = req.body;

    const maintenance = await Maintenance.findByPk(maintenanceId);

    if (maintenance) {
      await maintenance.update({
        userId,
        title,
        description,
        isPending,
        isFixed,
      });
      res.json(maintenance);
    } else {
      const error = new Error("Maintenance request couldn't be found.");
      error.status = 404;
      throw error;
    }
});

router.delete('/:maintenanceId', requireAuth, async (req, res) => {
    const { maintenanceId } = req.params;

    const maintenance = await Maintenance.findByPk(maintenanceId);

    if (maintenance) {
      await maintenance.destroy();
      return res.json({
        message: 'Successfully deleted',
        statusCode: 200,
      });
    } else {
      const error = new Error("Maintenance request couldn't be found.");
      error.status = 404;
      throw error;
    }
})

module.exports = router;
