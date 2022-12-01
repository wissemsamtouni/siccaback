const { panier, reservation, evenement } = require("../models");
const createpanier = async (req, res) => {
    const {quantite,prixtotal,prix} = req.body;
    try{
  const newpanier = await panier.findOne({
     where: {id:5}})
     if(!newpanier){
         const createpanier = await panier.create({
            prixtotal:prix*quantite,
              
            utilisateurIdUtilisateur:5,});
            
            if(createpanier){
             
           const  idevent = req.params.idevent;
        const event = await evenement.findOne({ where: { id:idevent}});
             
            
             const RES = await reservation.create({
                prix:req.body.prix,
                quantite:req.body.quantite,
                panierId:createpanier.id,
                EvenementId:event.id,
                prixticket:event.prixticket,
              
                });
                 return res.status(200).json({  panier: createpanier,reservation:RES });
            }     

 

 }
 else{
        const idevent = req.params.idevent;
        const valid = await reservation.findOne({ where: { EvenementId:idevent}});
        if(!valid){
        const event = await reservation.findOne({
            prixticket:req.body.prixticket,
            quantite:req.body.quantite,
     

        });
        return res.status(200).json({ reservation:event });
 }else {reservation ++;}
    }

    }catch(error){
        res.status(500).json({
            error:error.message,
        });
    }
 }
 module.exports = {createpanier};
 
 