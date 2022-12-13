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
      type: Sequelize.DOUBLE,
    },
    latitude: {
      type: Sequelize.DOUBLE,
    },
    horaire: {
      type: Sequelize.STRING,
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