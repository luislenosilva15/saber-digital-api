const db = require('../services/db')
const bcrypt = require('bcryptjs')

const schoolSchema = new db.Schema({

    schoolId: {
        type: Number,
    },

    email: {
        type: String,
    },

    password: {
        type: String,
    },

    schoolName: {
        type: String,
    },

    image: {
        type: String,
    },

    street: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        typr: String,
    },

    cep: {
        type: String,
    },

    streetNumber: {
        type: String,
    },

    phone: {
        type: String,
    },

    document: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

schoolSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const school = db.model('schools', schoolSchema);

module.exports = school;