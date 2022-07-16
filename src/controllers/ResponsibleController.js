const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { Storage } = require('../controllers/AssetsController');

const Responsible = require('../models/ResponsibleModel');

const storage = Storage('responsible');
const upload = multer({ storage });

// Create new responsible
router.post('/register', upload.any('image'), async(req, res) => {
    try {
        let responsible;
        const responsibleDetails = req.body;
        const image = req.files[0].filename;

        if (responsibleDetails && image != undefined) {
            responsible = Object.assign(responsibleDetails, { image })

        } else {
            return res.status(400).send({ message: "error register responsible" });
        }
        try {
            const responsibleDB = await Responsible.findOne({ email: responsibleDetails.email })

            if (responsibleDB == null) {
                try {
                    await Responsible.create(responsible)
                    return res.status(201).send({ message: "created" });
                } catch {
                    // DeleteImage('responsible', image)
                    return res.status(500).send({ message: "Internal Server Error" });
                }
            } else {
                // DeleteImage('responsible', image)
                return res.status(401).send({ message: "email already registered" });
            }
        } catch {
            // DeleteImage('responsible', image)
            return res.status(500).send({ message: "internal Server Error" });
        }

    } catch {
        // DeleteImage('responsible', image)
        return res.status(400).send({ message: "error register responsible" });
    }
})

// Responsible Login
router.post('/login', async(req, res) => {

    const { email, password, schoolId } = req.body;

    if (email && password && schoolId != undefined) {
        const responsibleDB = await Responsible.findOne({ email: email, schoolId: schoolId })

        if (responsibleDB != null) {
            bcrypt.compare(password, responsibleDB.password, function(err, result) {

                if (result) {

                    return res.status(201).send({ message: "authorized user", responsible: responsibleDB });

                } else {

                    return res.status(401).send({ message: "Incorrect email or password" });
                }
            })
        } else {
            return res.status(401).send({ message: "Incorrect email or password" });
        }
    }

});

module.exports = app => app.use('/responsible', router);