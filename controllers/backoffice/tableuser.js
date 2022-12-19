const express = require("express");
const {utilisateur} = require('../../models');
const router = express.Router();
const banUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await utilisateur.findByPk(id);
        if (!user) {
            return res.status(404).json({error: "user not found"});
        }
        else if(user.etat === "1") {
            await utilisateur.update({etat: '0'}, {where: {id_utilisateur: id}});
            return res.status(200).json({message: "user banned"});
        }
        else if(user.etat === "0") {
            await utilisateur.update({etat: '1'}, {where: {id_utilisateur: id}});
            return res.status(200).json({message: "user unbanned"});
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
module.exports = {
   banUser
}
