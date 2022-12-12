
var express = require('express');
const {getAllMateriel} = require("../controllers/materiel/materiel");
var router = express.Router();

router.get('/getAllMateriel', getAllMateriel);
module.exports = router;
