module.exports=(Sequelize,DataTypes)=>{
    const utilisateur=Sequelize.define('utilisateur',{
        id_promo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date_expiration:{
            type:DataTypes.DATE,
            allowNull:false},
        pourcentage_reduction:{
            type:DataTypes.INTEGER,
            allowNull:false}
    });
    return utilisateur;
}
