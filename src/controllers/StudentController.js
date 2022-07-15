const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { Storage, DeleteImage } = require('./AssetsController');

const Student = require('../models/StudentModel');

const storage = Storage('responsible');
const upload = multer({ storage });

// Create new responsible
router.post('/register', upload.any('image'), async(req, res) => {
    try {
        let student;
        const studentDetails = req.body;
        const image = req.files[0].filename;

        if (studentDetails && image != undefined) {
            student = Object.assign(studentDetails, { image })

        } else {
            return res.status(400).send({ message: "error register student" });
        }

        try {
            await Student.create(student)
            return res.status(201).send({ message: "created" });
        } catch {
            DeleteImage('students', image)
            return res.status(500).send({ message: "internal Server Error" });
        }

    } catch {
        DeleteImage('students', image)
        return res.status(400).send({ message: "error register student" });
    }
})



module.exports = app => app.use('/student', router);