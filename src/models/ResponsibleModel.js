const db = require('../services/db')
const bcrypt = require('bcryptjs')

const responsibleSchema = new db.Schema({
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

    studentId: [

    ],

    schoolId: {
        type: Number,
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

responsibleSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const responsible = db.model('responsible', responsibleSchema);

module.exports = responsible;