var express = require('express');
const {createUser ,updateUser,deleteUser,getAllUsers,getUser} = require('../controllers/utilisateur.controller');
const validate = require('../midlewares/validator');
const {login, user, logout} = require("../controllers/authentification/login");
const {addUser} =require("../controllers/authentification/registr")
var router = express.Router();

router.post('/createUser',createUser);
router.put('/update/:idUser',updateUser);
router.delete('/delete/:userId',deleteUser);
router.get('/getAllUsers',getAllUsers);
router.get('/getUser/:userId',getUser);
router.post('/login',login);
router.post('/registr',addUser);
router.post('/login',login);
router.get('/afficheruser',user);
router.post('/logout',logout)



module.exports = router;
