const db = require('../services/db')

const studentSchema = new db.Schema({

    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    image: {
        type: String,
    },

    street: {
        type: String,
    },
    streetNumber: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },

    phone: {
        type: String,
    },

    studentClassId: {
        type: String,
    },

    schoolId: {
        type: String,
    },

    gender: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const student = db.model('students', studentSchema);

module.exports = student;