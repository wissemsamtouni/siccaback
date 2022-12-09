const { promo } = require("../models");
const bcrypt = require('bcrypt');
const ajouterpromoavecidevent = async (req, res, next) => {
    try {
        const {id_event, pourcentage, date_debut, date_fin } = req.body;
        const newpromo = await promo.create({id_event, pourcentage, date_debut, date_fin });
        return res.status(201).json({promo: newpromo});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
    }


    module.exports = {
        ajouterpromoavecidevent
    };
