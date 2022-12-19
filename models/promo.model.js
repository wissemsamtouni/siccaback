module.exports=(Sequelize,DataTypes)=>{
    const promo=Sequelize.define('promo',{
        id_promo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        materielIdMateriel: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        EvenementId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date_expiration:{
            type:DataTypes.DATE,
            allowNull:false},
        pourcentage_reduction:{
            type:DataTypes.INTEGER,
            allowNull:false}
    });
    return promo;
}
