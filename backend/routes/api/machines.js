const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Machine, sequelize } = require('../../db/models');
const { Maintenance } = require('../../db/models');
const { Op } = require('sequelize');

// GET all machines
router.get('', requireAuth, async (req, res) => {
    const machines = await Machine.findAll({
        order: [
            ['number']
        ]
    });
    res.json({ machines });
})


// Get all machines with maintenance problems
router.get('/maintenance', requireAuth, async (req, res) => {
    const machines = await Machine.findAll({
        include: {
            model: Maintenance,
            // where: {
            //     isPending: true,
            //     isFixed: false
            // }
        },
        
    })
    const count = await Machine.count({
        // include: {
        //     model: Maintenance
        // }
    })
    // console.log('******************** ', machines.Maintenance.count())
    res.json({ machines, count })
})

// Create a machine
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

router.put('/:machineId', requireAuth, async(req, res) => {
    const { machineId } = req.params;
    const { number, type, manufacturer, name, machineImg } = req.body;

    const machine = await Machine.findByPk(machineId);

    if(machine){
        await machine.update({
            number,
            type,
            manufacturer,
            name,
            machineImg
        });
        res.json(machine)
    } else {
        const error = new Error("Machine couldn't be found.");
        error.status = 404;
        throw error
    }
})

router.delete('/:machineId', requireAuth, async (req, res) => {
    const { machineId } = req.params;

    const machine = await Machine.findByPk(machineId);

    if(machine){
        await machine.destroy();
        return res.json({
            message: 'Successfully deleted.',
            statusCode: 200
        })
    } else {
        const error = new Error("Machine couldn't be found.");
        error.status = 404;
        throw error;
    }
})

module.exports = router;
