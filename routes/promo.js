var express = require('express');
const {ajouterpromoavecidevent, addPromotion, getallpromo} = require("../controllers/promo/promo");
var router = express.Router();
router.post('/addpromo',addPromotion);
router.get('/getallpromo',getallpromo);
module.exports = router;
