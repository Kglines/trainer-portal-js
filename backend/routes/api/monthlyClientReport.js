const express = require('express');
const router = express.Router();
const { MonthlyClientReport } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('', requireAuth, async (req, res) => {
    const monthlyClientReport = await MonthlyClientReport.findAll();
    res.json({monthlyClientReport})
})

module.exports = router;
