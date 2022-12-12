const {Categorie}  = require("../models");

const createCategorie = async (req, res, next) => {
  const { nomcat} = req.body;
  try {
    const createcat = await Categorie.create({
        nomcat
    });
    res.status(201).json({
        createcat,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
    console.log(error);
  }
};
const  getCategorie = async (req, res) => {
  try {
    const { catId } = req.params;
    const catData = await Categorie.findOne({
      where: { id: catId },
    });
    if (!catData) {
      throw new Error("categorie not found");
    }
    res.status(200).json({
      catData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const updateCategorie  = async (req, res) => {
  try {
    const { catId } = req.params;
    const [updated] = await Categorie.update(req.body, {
      where: { id: catId },
    });
    if (updated) {
      const updatedcategorie = await Categorie.findOne({ where: { id: catId } });
      res.status(200).json({
        Categorie: updatedcategorie,
      });
    }
    throw new Error("categorie not found");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const deleteCategorie = async (req, res) => {
  try {
    const { catId } = req.params;
    const deleted = await Categorie.destroy({
      where: { id: catId },
    });
    if (!deleted) {
      throw new Error("categorie not found");
    }
    res.status(204).send("categorie deleted");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const getAllCategorie = async (req, res) => {
  try {
    const cat = await Categorie.findAll();
    if(!cat){
        throw new Error("No categorie found");
    }
    res.status(200).json({
      cat,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports = {
    getAllCategorie, 
    getCategorie, 
    createCategorie,
     deleteCategorie, 
     updateCategorie 
};