module.exports = (sequelize, Sequelize) => {
    const reservation = sequelize.define("reservation", {
      nbrticket: {
        type: Sequelize.STRING,
      },
    
      
     
    });
  
    return reservation;
  };