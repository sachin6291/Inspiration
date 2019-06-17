require('dotenv').config();
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary,
  folder: 'inspiration/user',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, res, cb) {
    cb(null, res.originalname);
  }
});

var storage2 = cloudinaryStorage({
  cloudinary,
  folder: 'inspiration/project',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, res, cb) {
    cb(null, res.originalname+new Date());
  }
});

const uploader = multer({storage} );
const uploader2 = multer({ storage :storage2} );

module.exports = {uploader, uploader2};