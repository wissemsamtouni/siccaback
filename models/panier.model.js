module.exports = (sequelize, Sequelize) => {
    const panier = sequelize.define("panier", {
     
    disponibilite: {
       type: Sequelize.BOOLEAN,
    },
    
    prixtotal: {
      type: Sequelize.INTEGER,
    },
  
    quantitetotal: {
        type: Sequelize.INTEGER,
      },
      
    });
  
    return panier;
  };