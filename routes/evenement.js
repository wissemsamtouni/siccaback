var express = require('express');
const { ajouterevent, affichierevent,modifierevent,deleteevent,affichiertevent,filtrageevent , findbytitre} = require('../controllers/evenement.controller');
const validateevent = require('../midlewares/evenement');
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
  
const upload = multer({ storage }).single('image');
router.post('/add',upload,ajouterevent );
router.get('/affichier/:Idevent', affichierevent);
router.get('/af', affichiertevent);
//router.get( '/search?', findbytitre);

router.put('/update/:Idevent',modifierevent);
router.delete('/delet/:Idevent', deleteevent);

 //router.get('/filtrage/:datedebut/:titre',filtrageevent);
 //router.get('/filtrage/search?',filtrageevent);
module.exports = router;
