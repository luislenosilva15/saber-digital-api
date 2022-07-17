const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const multer = require('multer');
const storage = require('../middleware/storage')
const parser = multer({ storage: storage });

const School = require('../models/SchoolModel');

// Create new school
router.post('/register', parser.single('image'), async(req, res) => {

    try {
        let school;
        const schoolDetails = req.body;
        const image = req.files[0].filename;

        if (schoolDetails && image != undefined) {
            school = Object.assign(schoolDetails, { image })
        } else {
            return res.status(400).send({ message: "error register school" });
        }
        try {
            const schoolDB = await School.findOne({ email: schoolDetails.email })
            if (schoolDB == null) {
                try {
                    School.create(school)
                    return res.status(201).send({ message: "created" });
                } catch {

                    return res.status(500).send({ message: "Internal Server Error" });
                }
            } else {

                return res.status(401).send({ message: "email already registered" });
            }
        } catch {

            return res.status(500).send({ message: "Internal Server Error" });
        }

    } catch {

        return res.status(400).send({ message: "error register school" });
    }
})



module.exports = app => app.use('/school', router);