
const express = require("express");
const {materiel} = require('../../models');


const getAllMateriel = async (req, res) => {
    try {
        const materiels = await materiel.findAll();
        if(!materiels){
            throw new Error("No materiel found");
        }
        res.status(200).json({
            materiels,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
module.exports = {
    getAllMateriel
}
