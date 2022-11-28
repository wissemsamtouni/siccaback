var express = require('express');
const { ajouterevent, affichierevent,modifierevent,deleteevent,affichiertevent,filtrageevent } = require('../controllers/evenement.controller');
const validateevent = require('../midlewares/evenement');

var router = express.Router();

router.get('/affichier/:Idevent', affichierevent);
router.get('/af', affichiertevent);
router.post('/add',validateevent,ajouterevent );
router.put('/update/:Idevent', validateevent,modifierevent);
router.delete('/delet/:Idevent', deleteevent);

 //router.get('/filtrage/:datedebut/:titre',filtrageevent);
 router.get('/filtrage/:titre',filtrageevent);
module.exports = router;
