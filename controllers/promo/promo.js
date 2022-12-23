const express = require("express");
const { promo} = require("../../models");
const { materiel } = require("../../models");
const { evenement } = require("../../models");
const bcrypt = require('bcrypt');


const addPromotion = async (req, res, next) => {
    try {
        const {materielIdMateriel, EvenementId, pourcentage_reduction,date_expiration} = req.body;
        const checkMatriel = await materiel.findOne({where: {id_materiel: materielIdMateriel}});
        const checkEvenement = await evenement.findOne({where: {id: EvenementId}});
        if (!checkMatriel) {
            res.status(404).json({error: "materiel not found"});
        }
        else if (!checkEvenement) {
            res.status(404).json({error: "evenement not found"});

        }
        else {
            const newPromo = await promo.create({materielIdMateriel, EvenementId, pourcentage_reduction,date_expiration});
            return res.status(201).json({promo: newPromo});
        }


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: error.message});
    }

}
const getallpromo = async (req, res, next) => {
    try {
        const allpromo = await promo.findAll();
        if(!allpromo){
            res.status(404).json({error: "no promo found"});
        }
        return res.status(200).json({allpromo});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const checkeventinpromo = async (req, res, next) => {
    try {
        const {EvId} = req.params;
        const checkpromo = await promo.findOne({where: {EvenementId: EvId}});
        if (!checkpromo) {
            res.status(404).json({error: "promo not found"});
        }
        else {
            return res.status(200).json({promo: checkpromo});
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
const deletepromo = async (req, res, next) => {
    try {
        const {promoId} = req.params;
        const checkpromo = await promo.findOne({where: {id_promo: promoId}});
        if (!checkpromo) {
            res.status(404).json({error: "promo not found"});
        }
        else {
            await promo.destroy({where: {id_promo: promoId}});
            return res.status(200).json("promo supprimé avec succes");
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}



    module.exports = {
        addPromotion,
        getallpromo,
        checkeventinpromo,
        deletepromo


    };
