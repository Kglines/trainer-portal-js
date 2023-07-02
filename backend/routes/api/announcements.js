const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Announcement } = require('../../db/models');

// Get All Announcements
router.get('', requireAuth, async (req, res) => {
    const announcements = await Announcement.findAll();
    res.json({ announcements });
})

module.exports = router;
