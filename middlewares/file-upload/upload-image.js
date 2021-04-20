const multer = require('multer');
const config = require('config');
const __root = require('app-root-path');
const md5 = require('md5');
const path = require('path');
const uploadSingle = require('./upload-single');
const uploadConfiguration = config.get('fileTypes.images');

// upload image
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __root + uploadConfiguration.uploadPath);
    },

    filename: function (req, file, callback) {
        callback(null, md5(Date.now()) + path.extname(file.originalname));
    }
});


const fileFilter = (req, file, cb, callback) => {
    // reject a file
    if ((file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
     

const limits = {
    fileSize: uploadConfiguration.maxSize
}


module.exports = function (fieldName) {
    return uploadSingle(fieldName, storage, fileFilter, limits);
}