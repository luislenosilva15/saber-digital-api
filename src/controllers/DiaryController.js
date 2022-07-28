const express = require('express');
const router = express.Router();
const moment = require('moment')

const Diary = require('../models/DiaryModel')

const multer = require('multer');
const storage = require('../middleware/storage');
const parser = multer({ storage: storage });

// Register new Diary
router.post('/register', parser.single('image'), async(req, res) => {

    try {
        let diaryDetails = req.body;
        let diary;

        if (req.file != undefined) {
            let image = req.file.path;
            diary = Object.assign(diaryDetails, { image })
        } else {
            diary = diaryDetails;
        }

        const diaryDb = await Diary.create(diary)

        return res.status(201).send({ message: "sucess" });

    } catch {
        return res.status(400).send({ message: "error register diary" });
    }
})

// List diary for student
router.get('/list', parser.single('image'), async(req, res) => {
    try {

        const { studentId, timeCreate } = req.query;

        const diary = await Diary.find({
            studentId,
            timeCreate: {
                $gte: timeCreate,
                $lte: moment(timeCreate).endOf('day').toDate()
            }
        })
        return res.status(200).send(diary);

    } catch {
        return res.status(400).send({ message: "error list diary to student" });
    }
})

module.exports = app => app.use('/diary', router);