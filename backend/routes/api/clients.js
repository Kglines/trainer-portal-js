const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { Client } = require('../../db/models');

// Get All Clients
router.get('', requireAuth, async (req, res) => {
    const { user } = req;
    const clients = await Client.findAll({
        where: {
            userId: user.id
        },
        order: [
            ['isActive', 'DESC'],
            ['lastname'],
            ['firstname']
        ]
    });
    
    res.json({ clients });
})

// Create a Client
router.post('', requireAuth, async (req, res) => {
    const { user } = req;
    const { firstname, lastname, isActive } = req.body;

    const client = await Client.create({
        userId: user.id,
        firstname,
        lastname,
        isActive
    });
    res.status(201);
    res.json(client);
})


module.exports = router;
