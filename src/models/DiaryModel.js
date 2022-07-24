const db = require('../services/db')

const diarySchema = new db.Schema({

    title: {
        type: String,
    },

    details: {
        type: String,
    },

    timeCreate: {
        type: Date,
    },

    stars: {
        type: Number,
    },

    image: {
        type: String,
    },

    studentId: {
        type: String,
    },

    schoolId: {
        type: String,
    },

    teacherId: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const diary = db.model('diary', diarySchema);

module.exports = diary;