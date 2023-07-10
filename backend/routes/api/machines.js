const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Machine } = require('../../db/models');

router.get('', requireAuth, async (req, res) => {
    const machines = await Machine.findAll();
    res.json({ machines });
})

module.exports = router;
