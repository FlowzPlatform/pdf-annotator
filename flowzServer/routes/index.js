const express = require('express');
let router = express.Router();
let upload = require('./upload')
let getFileList = require('./getFileList')
let getFile = require('./getFile')

router.get('/', (req, res) => {
  res.send({msg: 'server working'})
});
router.use('/upload', upload);
router.use('/getFileList', getFileList);
router.use('/getFile', getFile);

module.exports = router;
