var express = require('express');
const {createpanier } = require('../controllers/panier.controller');
var router = express.Router();

router.post('/addP/:idevent', createpanier);

module.exports = router;
