module.exports = (sequelize, Sequelize) => {
    const panier = sequelize.define("panier", {
     
    disponibilite: {
       type: Sequelize.BOOLEAN,
    },
    
    prixtotal: {
      type: Sequelize.INTEGER,
    },
  
      
    });
  
    return panier;
  };