const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { Storage, DeleteImage } = require('../controllers/AssetsController');

const School = require('../models/SchoolModel');

const storage = Storage('schools');
const upload = multer({ storage });

// Create new school
router.post('/register', upload.any('image'), async(req, res) => {

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
                    DeleteImage('schools', image)
                    return res.status(500).send({ message: "Internal Server Error" });
                }
            } else {
                DeleteImage('schools', image)
                return res.status(401).send({ message: "email already registered" });
            }
        } catch {
            DeleteImage('schools', image)
            return res.status(500).send({ message: "Internal Server Error" });
        }

    } catch {
        DeleteImage('schools', image)
        return res.status(400).send({ message: "error register school" });
    }
})



module.exports = app => app.use('/school', router);