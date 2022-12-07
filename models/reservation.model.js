module.exports = (sequelize, Sequelize) => {
    const reservation = sequelize.define("reservation", {
      quantite: {
        type: Sequelize.INTEGER,
      },
      prixticket: {
        type: Sequelize.INTEGER,
      },
        
     
     
    });
  
    return reservation;
  };