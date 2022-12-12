module.exports = (sequelize, Sequelize) => {
  const Categorie = sequelize.define("Categorie", {
    nomcat: {
      type: Sequelize.STRING,
    }
   
  });

  return Categorie;
};