const mongoose = require("mongoose");
let dbName = "saber-digital-db-test";

mongoose.connect(`mongodb+srv://saberdigital:saberdigital@saber-digital-db.bbpgwpb.mongodb.net/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true },

    function(err) {
        if (err) throw err;
        else {
            console.log('sucess connection with db');
        }
    });

module.exports = mongoose;