var express = require('express');
const {ajouterpromoavecidevent, addPromotion, getallpromo, checkeventinpromo, deletepromo} = require("../controllers/promo/promo");
var router = express.Router();
router.post('/addpromo',addPromotion);
router.get('/getallpromo',getallpromo);
router.get('/geteventinpromo/:EvId',checkeventinpromo);
router.delete('/deletepromo/:promoId',deletepromo);
module.exports = router;
