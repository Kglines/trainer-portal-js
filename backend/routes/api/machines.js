const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Machine } = require('../../db/models');

router.get('', requireAuth, async (req, res) => {
    const machines = await Machine.findAll();
    res.json({ machines });
})

router.post('', requireAuth, async (req, res) => {
    const { number, type, manufacturer, name, machineImg } = req.body;

    const machine = await Machine.create({
        number,
        type,
        manufacturer,
        name,
        machineImg
    });
    res.status(201);
    res.json(machine)
})

module.exports = router;
