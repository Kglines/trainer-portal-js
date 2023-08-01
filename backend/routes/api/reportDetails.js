const express = require("express");
const router = express.Router();

const { requireAuth } = require("../../utils/auth");
const { MonthlyReportDetail } = require("../../db/models");

router.get("/", requireAuth, async (req, res) => {
    const reportDetails = await MonthlyReportDetail.findAll();
    return res.json(reportDetails);
});

module.exports = router;
