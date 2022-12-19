const express = require("express");
const {utilisateur} = require('../../models')
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const sendEmail = require("../../utils/sendEmail");



const sendLink = async (req, res, next) => {
    const {mail} = req.body
    try {
        const userWithEmailExist = await utilisateur.findOne({where: {mail}})
        if (!userWithEmailExist)
            return res.status(400).json({message: "Adresse Email n'existe pas", titre: "DESOLE"});
        if (!userWithEmailExist.token) {
            userWithEmailExist.token = crypto.randomBytes(32).toString("hex");
            userWithEmailExist.save()
        }

        const link = `http://localhost:4200/auth/changermdp/${userWithEmailExist.id_utilisateur}/${userWithEmailExist.token}`;

        await sendEmail(userWithEmailExist, "Réinitialisation du mot de passe", link);

        res.status(200).json({
            message: "lien de réinitialisation du mot de passe envoyé à votre compte de messagerie",
            titre: "SUCCESS"
        });
    } catch (error) {
        res.status(500).json({error: error.message,titre: "DESOLE"})
    }
}
const passwordReset = async (req, res, next) => {

    try {
        const userForReset = await utilisateur.findOne({where: {id_utilisateur:req.params.userId}});
        if (!userForReset) return res.status(400).json({message:"lien invalide ou expiré",titre:"Réesayer"});
        if (!userForReset.token) return res.status(404).send({message:"lien invalide ou expiré",titre:"Réesayer"});
        console.log(userForReset.token,req.params.token)
        if (userForReset.token!=req.params.token) return res.status(405).send({message:"lien invalide ou expiré",titre:"Réesayer"});
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.mdp, salt);
        userForReset.mdp = hash;
        userForReset.token=null
        await userForReset.save();

        res.status(200).json({message:"Mot de passe Réinitialisé avec succès.",titre:"SUCCESS"});
    } catch (error) {
        res.status(500).json({error: error.message,titre:"Réesayer"})
    }
}
module.exports = {
    sendLink,
    passwordReset
}
