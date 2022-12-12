const {Sequelize, DataTypes} = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const materiel = Sequelize.define('materiel', {
        id_materiel: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        categorie: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantité: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prix_location: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },

    });
    return materiel;
}
