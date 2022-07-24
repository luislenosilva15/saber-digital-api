const express = require('express');
const router = express.Router();

const Student = require('../models/StudentModel');
const Responsible = require('../models/ResponsibleModel');
const StudentClass = require('../models/StudentClassModel');

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

router.get('/list/responsible', async(req, res) => {

    try {
        const { responsibleId } = req.query;
        const studentData = [];

        const studentId = await Responsible.findById(responsibleId).distinct('studentId')

        if (req.query.type == "small") {
            for (let i = 0; i < studentId.length; i++) {
                const student = await Student.findById(studentId[i])
                const studentClass = await StudentClass.findById(student.studentClassId)
                studentData.push({
                    _id: student._id,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    image: student.image,
                    studentClassName: studentClass.name
                })
            }
        } else {
            for (let i = 0; i < studentId.length; i++) {
                const student = await Student.findById(studentId[i])
                studentData.push(student)
            }
        }
        return res.status(200).send(studentData);

    } catch {
        return res.status(400).send({ message: "error list students" });
    }
})

router.get('/list/single', async(req, res) => {

    try {
        const { studentId } = req.query;
        let studentData;

        if (req.query.type == "small") {

            const student = await Student.findById(studentId)
            const studentClass = await StudentClass.findById(student.studentClassId)
            studentData = {
                _id: student._id,
                firstName: student.firstName,
                lastName: student.lastName,
                image: student.image,
                studentClassName: studentClass.name
            }

        } else {
            const student = await Student.findById(studentId)
            studentData = student

        }
        return res.status(200).send(studentData);

    } catch {
        return res.status(400).send({ message: "error list student" });
    }
})
module.exports = app => app.use('/student', router);