const { Bonplans } = require("../models");
const { Categorie } = require("../models");

const createBonplans= async (req, res, next) => {
  const { non_bp, adresse,description,logitude,latitude,horaire,frais,CategorieId,imageSRC } = req.body;
  const {file}=req;
  try {

    const cat =await Categorie.findOne({where:{nomcat:req.body.nomcat}})
    const createdbpl = await Bonplans.create({
        non_bp, 
        adresse,
        description,
        logitude,
        latitude,
        horaire,
        frais,
        CategorieId:cat.id,
        imageSRC:file.path || null
    });
    res.status(201).json({
      createdbpl,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const getBonplans = async (req, res) => {
  try {
    const {bonplansId } = req.params;
    const bplData = await Bonplans.findOne({
      where: { id: bonplansId },
    });
    if (!bplData) {
      throw new Error("User not found");
    }
    res.status(200).json({
        bplData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


const updateBonplans = async (req, res) => {
  try {
    const { bonplansId } = req.params;
    const [updated] = await Bonplans.update(req.body, {
      where: { id: bonplansId },
    });
    if (updated) {
      const updatedbpl = await Bonplans.findOne({ where: { id: bonplansId } });
      res.status(200).json({
        Bonplans: updatedbpl,
      });
    }
    throw new Error("User not found");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const deleteBonplans = async (req, res) => {
  try {
    const { bonplansId } = req.params;
    const deleted = await Bonplans.destroy({
      where: { id: bonplansId },
    });
    if (!deleted) {
      throw new Error("bonplans not found");
    }
    res.status(204).send("bonplans deleted");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const getAllBonplans = async (req, res) => {
  try {
    const bpl = await Bonplans.findAll();
    if(!bpl){
        throw new Error("No users found");
    }
    res.status(200).json({
        bpl,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports = {
  createBonplans,
  getBonplans,
  updateBonplans,
  deleteBonplans,
  getAllBonplans,
};
