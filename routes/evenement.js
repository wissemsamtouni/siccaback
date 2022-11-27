var express = require('express');
const { ajouterevent, affichierevent,modifierevent,deleteevent,affichiertevent } = require('../controllers/evenement.controller');
const validateevent = require('../midlewares/evenement');

var router = express.Router();

router.get('/affichier/:Idevent', affichierevent);
router.get('/af', affichiertevent);
router.post('/add',ajouterevent );
router.put('/update/:Idevent', modifierevent);
router.delete('/delet/:Idevent', deleteevent);

module.exports = router;
