const express = require('express');
const router = express.Router();

const Student = require('../models/StudentModel');

const multer = require('multer');
const storage = require('../middleware/storage')
const parser = multer({ storage: storage });

// Create new responsible
router.post('/register', parser.single('image'), async(req, res) => {
    try {
        let student;
        const studentDetails = req.body;
        const image = req.file.path

        if (studentDetails && image != undefined) {
            student = Object.assign(studentDetails, { image })

        } else {
            return res.status(400).send({ message: "error register student" });
        }

        try {
            await Student.create(student)
            return res.status(201).send({ message: "created" });
        } catch {

            return res.status(500).send({ message: "internal Server Error" });
        }

    } catch {
        return res.status(400).send({ message: "error register student" });
    }
})

module.exports = app => app.use('/student', router);