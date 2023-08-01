const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const reportDetails = await ReportDetails.findAll();
    return res.json(reportDetails);
});

module.exports = router;
