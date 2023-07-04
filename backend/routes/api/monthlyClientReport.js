const express = require('express');
const router = express.Router();
const { MonthlyClientReport } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('', requireAuth, async (req, res) => {
    const monthlyClientReports = await MonthlyClientReport.findAll();
    const count = monthlyClientReports.length
    res.json({monthlyClientReports, count})
})

router.post('', requireAuth, async (req, res) => {
    const { user } = req;
    const { month, year } = req.body;

    const report = MonthlyClientReport.create({
        userId: user.id,
        month,
        year
    })

    res.status(201);
    res.json(report)
})

module.exports = router;
