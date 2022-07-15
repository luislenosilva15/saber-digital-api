const db = require('../services/db')

const studentClassSchema = new db.Schema({

    name: {
        type: String,
    },

    description: {
        type: String,
    },

    schoolId: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const studentClass = db.model('studentClass', studentClassSchema);

module.exports = studentClass;