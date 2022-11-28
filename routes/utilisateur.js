var express = require('express');
const {createUser ,updateUser,deleteUser,getAllUsers,getUser} = require('../controllers/utilisateur.controller');
const validate = require('../midlewares/validator');
var router = express.Router();

router.post('/createUser',createUser);
router.put('/update/:idUser',updateUser);
router.delete('/delete/:userId',deleteUser);
router.get('/getAllUsers',getAllUsers);
router.get('/getUser/:userId',getUser)



module.exports = router;
