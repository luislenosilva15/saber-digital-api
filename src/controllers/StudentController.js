const express = require('express');
const router = express.Router();

const Student = require('../models/StudentModel');
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

// List students 
// Pass type for list small or long attributes, if not pass, return all atributes
router.get('/list', async(req, res) => {

    try {
        const students = req.body;
        const { type } = req.query;
        let student = [];

        if (students != undefined) {

            for (let i = 0; i < students.length; i++) {

                const studentData = await Student.findById(students[i])
                if (type == undefined) {
                    const studentClassName = await StudentClass.findById(studentData.studentClassId)
                    if (studentClassName != null) {

                        student.push(studentData)
                    } else {
                        return res.status(401).send({ message: "failed to find studentClass" });
                    }
                }

                if (type == 'smaill') {
                    const studentClassName = await StudentClass.findById(studentData.studentClassId)

                    if (studentClassName != null) {
                        student.push({
                            "firstName": studentData.firstName,
                            "lastName": studentData.lastName,
                            "image": studentData.image,
                            "studentClassName": studentClassName.name
                        })
                    } else {
                        return res.status(401).send({ message: "failed to find studentClass" });
                    }
                }
            }

            if (student != []) {
                return res.status(200).send(student);
            } else {
                return res.status(401).send({ message: "failed to find a list of students" });
            }

        } else {
            return res.status(400).send({ message: "failed to find students" });
        }

    } catch {

        return res.status(400).send({ message: "failed to find students" });
    }
})

module.exports = app => app.use('/student', router);