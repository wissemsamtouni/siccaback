const {utilisateur} = require("../../models");
const bcrypt = require('bcrypt');
const express = require("express");
const registrmail = require("../../utils/registrmail");
const router = express.Router();
const registerUser = async (req, res, next) => {
    try {
        const {nom, prenom, mail, login, tel, adresse } = req.body;
        // hash password before saving in database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.mdp, salt);

        const ifemailexist = await utilisateur.findOne({where: {login: login , mail: mail}});
        if (ifemailexist) {
            throw new Error("login ou maill deja exist");
            return res.status(400).json({error: "login deja exist"});

        }
        const newUser = await utilisateur.create({nom, prenom, mail, login, mdp : hashedPassword, tel, role:'client', adresse  });
        const userWithEmailExist = await utilisateur.findOne({where: {mail}})
        await registrmail(userWithEmailExist,"mail de bienvenu  👋 ", newUser.nom);
        return res.status(201).json({user: newUser});

    } catch (error) {
      console.log(error)
        return res.status(500).json({error: error.message});
    }
    }


;
module.exports = {
    registerUser

};
