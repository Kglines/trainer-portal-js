const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Announcement } = require('../../db/models');

// Get All Announcements
router.get('', requireAuth, async (req, res) => {
    const announcements = await Announcement.findAll({
        attributes: [
            'id',
            'userId',
            'month',
            'body',
            'createdAt',
            'updatedAt'
        ]
    });
    console.log('************* announcements === ', announcements)
    res.json({ announcements });
})

// Create an Announcement
router.post('/', requireAuth, async (req, res) => {
    const { user } = req;
    const { month, body } = req.body;
    
    const announcement = await Announcement.create({
      userId: user.id,
      month,
      body
    });
    res.status(201);
    res.json(announcement);
})

// Edit an Announcement
router.put('/:announcementId', requireAuth, async (req, res) => {
    const { announcementId } = req.params;
    const { month, body } = req.body;

    const announcement = await Announcement.findByPk(announcementId);
    if(announcement){
        await announcement.update({
            month,
            body
        })
        res.json(announcement)
    } else {
        const error = new Error("Announcement couldn't be found");
        error.status = 404;
        throw error;
    }
})

// Delete an Announcement
router.delete('/:announcementId', requireAuth, async (req, res) => {
    const { announcementId } = req.params;
    console.log('announcementId === ', announcementId)
    const announcement = await Announcement.findByPk(announcementId);
   console.log('Announcement === ', announcement);
    if(announcement){
        await announcement.destroy();
        return res.json({
          message: 'Successfully deleted',
          statusCode: 200,
        })
    } else {
        const error = new Error("Announcement couldn't be found.");
        error.status = 404;
        throw error;
    }
})

module.exports = router;
