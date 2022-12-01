var express = require('express');
const { get } = require('.');
const {createreservation } = require('../controllers/reservation.controller');


var router = express.Router();

router.post('/addR', createreservation);

module.exports = router;