const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const multer = require('multer');
const storage = require('../middleware/storage')
const parser = multer({ storage: storage });

const Responsible = require('../models/ResponsibleModel');

// Create new responsible
router.post('/register', parser.single('image'), async(req, res) => {
    try {
        let responsible;
        const responsibleDetails = req.body;
        const image = req.file.path;

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

                    return res.status(500).send({ message: "Internal Server Error" });
                }
            } else {

                return res.status(401).send({ message: "email already registered" });
            }
        } catch {

            return res.status(500).send({ message: "internal Server Error" });
        }

    } catch {

        return res.status(400).send({ message: "error register responsible" });
    }
})

// Responsible Login
router.post('/login', async(req, res) => {

    const { email, password } = req.body;

    if (email && password != undefined) {
        const responsibleDB = await Responsible.findOne({ email: email })

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