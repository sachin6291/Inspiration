const express = require('express');
const router = express.Router();

const { uploader, uploader2} = require('../configs/cloudinary.config');

router.post('/upload-user', uploader.single("imageUrl"), (req, res, next) => {

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
})
router.post('/upload-project', uploader2.single("imageUrl"), (req, res, next) => {

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  console.log(req.file)

  res.json({ secure_url: req.file.secure_url });
})

module.exports = router;