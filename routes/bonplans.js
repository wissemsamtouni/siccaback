var express = require('express');
const { getAllBonplans, getBonplans, createBonplans, deleteBonplans, updateBonplans } = require('../controllers/bonplans.controller');

var router = express.Router();
const multer=require('multer');
// configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
      }
  })
  
  const upload = multer({ storage }).single('imageSRC');

router.get('/', getAllBonplans);
router.get('/:bonplansId', getBonplans);
router.post('/addbp',upload, createBonplans);
router.put('/update/:bonplansId',upload,updateBonplans);
router.delete('/delete/:bonplansId', deleteBonplans);

module.exports = router;
