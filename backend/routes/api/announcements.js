const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Announcement } = require('../../db/models');

// Get All Announcements
router.get('', requireAuth, async (req, res) => {
    const Announcements = await Announcement.findAll();
    res.json({ Announcements });
})

module.exports = router;
