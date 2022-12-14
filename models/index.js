'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


  fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.evenement=require("./evenement.model.js")(sequelize,Sequelize);
db.Categorie=require("./categorie.model.js")(sequelize,Sequelize);
db.Bonplans=require("./bonplans.model.js")(sequelize,Sequelize);
db.reservation=require("./reservation.model.js")(sequelize,Sequelize);

db.panier=require("./panier.model.js")(sequelize,Sequelize);
db.utilisateur =require("./utilisateur.model.js")(sequelize,Sequelize);
db.promo =require("./promo.model.js")(sequelize,Sequelize);
db.materiel =require("./materiel.model.js")(sequelize,Sequelize);

db.Bonplans.belongsTo(db.Categorie);
db.Categorie.hasMany(db.Bonplans);
db.evenement.hasMany(db.panier);
db.panier.belongsTo(db.evenement);
// db.promo.hasMany(db.evenement);
// db.evenement.belongsTo(db.promo);




db.evenement.hasMany(db.reservation);
db.reservation.belongsTo(db.evenement);

db.reservation.belongsTo(db.panier);
db.panier.hasMany(db.reservation);

db.panier.belongsTo(db.utilisateur/* , {
 foreignKey: 'utilisateurIdUtilisateur'
}*/);
db.utilisateur.hasOne(db.panier /* , {
  foreignKey: 'utilisateurIdUtilisateur'
}*/);
db.evenement.hasOne(db.promo);
db.promo.belongsTo(db.evenement);
db.promo.belongsTo(db.materiel);


module.exports = db;
