const express = require('express');
const router = express.Router();

const StudentClass = require('../models/StudentClassModel');


// Create new school
router.post('/register', async(req, res) => {

    const studentClass = req.body;
    try {
        if (studentClass != undefined) {
            await StudentClass.create(studentClass)
            return res.status(201).send({ message: "created" });

        } else {
            return res.status(400).send({ message: "error register StudentClass" });
        }

    } catch {
        return res.status(400).send({ message: "error register StudentClass" });
    }

})
module.exports = app => app.use('/studentClass', router);