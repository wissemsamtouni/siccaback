module.exports = (sequelize, Sequelize) => {
  const Bonplans = sequelize.define("Bonplans", {
    non_bp: {
      type: Sequelize.STRING,
    },
  
    
    adresse: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    logitude: {
      type: Sequelize.STRING,
    },
    latitude: {
      type: Sequelize.FLOAT,
    },
    horaire: {
      type: Sequelize.FLOAT,
    },
    frais: {
      type: Sequelize.STRING,
    },
    imageSRC: {
      type: Sequelize.STRING,
    }
  });

  return Bonplans;
};