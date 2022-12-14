var express = require('express');
const {createUser ,updateUser,deleteUser,getAllUsers,getUser, changePassword} = require('../controllers/utilisateur.controller');
const validate = require('../midlewares/validator');
const {login, user, logout} = require("../controllers/authentification/login");
const{banUser}=require("../controllers/backoffice/tableuser");
const {registerUser} =require("../controllers/authentification/registr")
const {sendLink, passwordReset} = require("../controllers/authentification/forgetPasswordController");
const {sendemail} = require("../controllers/email/mail");
var router = express.Router();

router.post('/createUser',createUser);
router.put('/update',updateUser);
router.delete('/delete/:userId',deleteUser);
router.get('/getAllUsers',getAllUsers);
router.get('/getUser/:userId',getUser);
router.post('/login',login);
router.post('/registr',registerUser); //  postman : http://localhost:3000/api/registr
router.post('/login',login);
router.get('/afficheruser',user); //
router.post('/logout',logout);
router.put('/banner/:id',banUser);
router.put('/resetpassword',changePassword);
router.post ("/sendlink",sendLink);
router.post('/password_reset/:userId/:token',passwordReset);
router.post('/sendmail',sendemail)



module.exports = router;
