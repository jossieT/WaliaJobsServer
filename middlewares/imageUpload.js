const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

var imageUpload = multer({
    storage: storage,
    filefilter: function (req, file, callback) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
            callback(null, true);
        } else {
            console.log('only png and jpg file types are supported');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = imageUpload;