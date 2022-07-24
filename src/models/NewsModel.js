const db = require('../services/db')

const newsSchema = new db.Schema({

    title: {
        type: String,
    },

    details: {
        type: String,
    },

    image: {
        type: String,
    },

    studentClass: {

    },

    schoolId: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const news = db.model('news', newsSchema);

module.exports = news;