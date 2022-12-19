const {reservation, evenement, panier } = require("../models");
// //update prix et quantite
// const modifierreservation = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quantite, prixticket } = req.body;
//     const reservation = await reservation.update(
//       {
//         quantite: quantite,
//         prixticket: prixticket,
//       },
//       {
//         where: {
//         id: id,
//          idutilisateur: idutilisateur,
//          idpanier: idpanier,
//         },
//       }
//     );
//     if (!reservation) {
//       throw new Error("No reservation found");
//     }
//     res.status(200).json({
//       reservation,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// }
//create reservation
const createreservation = async (req, res) => {
   const {quantite,prixticket} = req.body;
   try{
 const reservat = await reservation.findOne({
    where: {id:1}})
    if(!reservation){
        const createreservation = await reservat.create({
            prixticket:prixticket,
            
          
     
            
            idutilisateur:req.utilisateur.id,});
            const panie = await panier.create({
               prix:req.body.prix,
                quantite:req.body.quantite,
                idpanier:createreservation.idpanier,

    
 });
 return res.status(200).json({  reservation: createreservation,panier:panie });

}
   }catch(error){
       res.status(500).json({
           error:error.message,
       });
   }
}


//create card panier selon id utilisateur
const createreservationutilisateur = async (req, res) => {
    const {quantite,prixticket} = req.body;
    try{
    const reservat = await reservation.findOne({
        where: {idutilisateur:req.utilisateur.id}})
        if(!reservation){
            const createreservation = await reservat.create({
                prixticket:prixticket,

                idutilisateur:req.utilisateur.id,});
                const panie = await panier.create({
                     prix:req.body.prix,
                    quantite:req.body.quantite,
                    idpanier:createreservation.idpanier,
                    




        });
        return res.status(200).json({  reservat: createreservation,panier:panie });

        }
    }catch(error){
        res.status(500).json({
            error:error.message,
        });
    }
    }
    

//create card panier
const createreservation1 = async (req, res) => {
    try {
        const { idutilisateur, idpanier } = req.params;
        const { quantite, prixticket } = req.body;
        const reservat = await reservation.create({
            quantite: quantite,
            prixticket: prixticket,
            idutilisateur: idutilisateur,
            idpanier: idpanier,
        });
        if (!reservat) {

            throw new Error("No reservation found");
        }
        res.status(200).json({
            reservat,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}
//delete reservation
const deletereservation = async (req, res) => {

    try {
        const { id } = req.params;
        const reservat = await reservation.destroy({
            where: {
                id: id,
            },
        });
        if (!reservat) {
            throw new Error("No reservation found");
        }
        res.status(200).json({
            reservat,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}
//afficher reservation  selon id panier
const afficherreservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservat = await reservation.findAll({
            where: {
                idpanier: id,
            },
        });


        if (!reservation) {
            throw new Error("No reservation found");
        }
        res.status(200).json({
            reservation,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}
//afficher reservation  selon id utilisateur
const afficherreservationutilisateur = async (req, res) => {
    try {

        const { id } = req.params;
        const reservat = await reservation.findAll({
            where: {
                idutilisateur: id,
            },
        });
        if (!reservation) {

            throw new Error("No reservation found");
        }
        res.status(200).json({
            reservation,
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}
//afficher reservation  selon id utilisateur et id panier
const afficherreservationutilisateurpanier = async (req, res) => {
    try {

        const { idutilisateur, idpanier } = req.params;
        const reservat = await reservation.findAll({
            where: {
                idutilisateur: idutilisateur,
                idpanier: idpanier,
            },
        });
        if (!reservat) {

            throw new Error("No reservation found");
        }
        res.status(200).json({
            reservat,
        });

    } catch (error) {
        res.status(500).json({

            error: error.message,
        });
    }
}
//update reservation
const modifierreservation = async (req, res) => {
    try {
        const { id } = req.params;

        const { quantite, prixticket } = req.body;
        const reservat = await reservation.update(
            {
                quantite: quantite,
                prixticket: prixticket,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        if (!reservat) {
            throw new Error("No reservation found");
        }
        res.status(200).json({
            reservat,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}
module.exports = {
    createreservation,
    deletereservation,

    afficherreservation,
    afficherreservationutilisateur,

    afficherreservationutilisateurpanier,
    modifierreservation,
}







