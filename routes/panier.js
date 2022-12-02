var express = require('express');
const {createpanier,affichertpanier,afficherIdpanier,deletereservation } = require('../controllers/panier.controller');
var router = express.Router();

router.post('/addP/:idevent', createpanier);
router.get('/afficherP', affichertpanier);
router.get('/affichidpan/:idpanier', afficherIdpanier);

router.delete('/deleteR/:idreservation', deletereservation);


module.exports = router;
