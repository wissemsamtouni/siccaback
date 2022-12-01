module.exports = (sequelize, Sequelize) => {
    const reservation = sequelize.define("reservation", {
      quantite: {
        type: Sequelize.STRING,
      },
      prixticket: {
        type: Sequelize.INTEGER,
      },
        
    
      
     
    });
  
    return reservation;
  };