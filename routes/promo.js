var express = require('express');
const {ajouterpromoavecidevent} = require("../controllers/promo/promo");
var router = express.Router();
router.post('/addpromo',ajouterpromoavecidevent);
module.exports = router;
