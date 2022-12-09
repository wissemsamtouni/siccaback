var express = require('express');
const {deletePanier,createPanier,getOnePanier, getPanier} = require('../controllers/panier.controller');
var router = express.Router();
router.delete('/deleteR/:idLignePanier/:panierId', deletePanier);
router.post('/addR/:id', createPanier);
router.get('/getR', getOnePanier);
router.get('/getp', getPanier);


module.exports = router;
