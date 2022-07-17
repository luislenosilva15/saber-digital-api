const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dbt9ndqix',
    api_key: '481928745611289',
    api_secret: 'owwa-xDT0sX0uOVq_xnZZ18Ywqw'
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: async(req) => req.baseUrl,
        format: async(req, file) => 'png',
        public_id: (req, file) => Date.now() + '_' + file.originalname,
    },
});

module.exports = storage;