const { Sequelize, DataTypes } = require("sequelize");

module.exports=(Sequelize,DataTypes)=>{
    const utilisateur=Sequelize.define('utilisateur',{
        id_utilisateur:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom:{
            type:DataTypes.STRING,
            allowNull:false
        },
        prenom:{
            type:DataTypes.STRING,
            allowNull:false},
        mail:{
            type:DataTypes.STRING,
            allowNull:false},
        login:{
            type:DataTypes.STRING,
            allowNull:false},
        mdp:{
            type:DataTypes.STRING,
            allowNull:false},
        tel:{
            type:DataTypes.INTEGER,
            allowNull:false},
        role:{
            type:DataTypes.STRING,
            allowNull:false},
        adresse:{
            type:DataTypes.STRING,
            allowNull:false},
        code:{
            type:DataTypes.STRING,
            allowNull:true
        },
        etat:{
            type:DataTypes.STRING,
            allowNull:false}


    });
    return utilisateur;
}
