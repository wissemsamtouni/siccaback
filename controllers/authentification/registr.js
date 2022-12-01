const {utilisateur} = require("../../models");
const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const addUser = async (req, res, next) => {
    try {
        const {nom, prenom, mail, login, mdp, tel, role, adresse, code, etat } = req.body;
        const ifLoginExist = await utilisateur.findOne({where: {login: login}});


        if (ifLoginExist) {
            throw new Error("login deja exist");
        }
        const salt =await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(mdp,salt)

        const newUser = await utilisateur.create(
            {   nom,
                prenom,
                mail,
                login,
                mdp,
                tel,
                role,
                adresse,
                code,
                etat
             });
        newUser.mdp=hashedPassword;
        newUser.save();

        return res.status(201).json({user: newUser});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};
module.exports = {
    addUser,
};
