const db = require('../services/db')
const bcrypt = require('bcryptjs')

const teacherSchema = new db.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
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

    address: {
        type: String,
    },

    phone: {
        type: String,
    },

    studentClassId: [

    ],

    schoolId: {
        type: String,
    },

    gender: {
        type: String,
    },

    document: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    codePassword: {
        type: Number,
    }
});

teacherSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const teacher = db.model('teachers', teacherSchema);

module.exports = teacher;