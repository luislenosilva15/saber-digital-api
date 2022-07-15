const multer = require('multer');
const fs = require('fs')

function Storage(folder) {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, `assets/images/${folder}`)
        },
        filename: function(req, file, cb) {

            const extensaoArquivo = file.originalname.split('.')[1];
            const fileName = file.originalname;

            cb(null, `${folder}${Math.random()}-${fileName}`)
        }
    });

    return storage;
}


function SaveImage() {
    return "save"
}

async function DeleteImage(folder, imageName) {

    fs.unlink(`assets/images/${folder}/${imageName}`, function(err) {
        if (err) {
            return;
        }
        return;
    });
}

module.exports = { SaveImage, DeleteImage, Storage };