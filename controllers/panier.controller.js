const { panier, reservation,event_reservation, evenement } = require("../models");

// ajouter panier //
const createPanier = async (req, res, next) => {
    const {quantite, prixticket} = req.body

    try {

        const ifexist = await panier.findOne({where: {utilisateurIdUtilisateur: 1}});
        //const newEvent = await evenement.findOne({where:{id:req.params.id,
            //}});
        // const newRes = await reservation.findOne({where:{reservationId:req.params.reservationId,}}) 
        // const event_reservation = await event_reservation.findAll({where:{}})   
        

        if (!ifexist) {

            const newPanier = await panier.create({
                prixtotal: prixticket * quantite,

                utilisateurIdUtilisateur: 1,

            }).catch(err => console.log(err))

            if (newPanier) {
               
              
                const item = await reservation.create({
                    
                    prixticket: req.body.prixticket,
                    quantite: req.body.quantite,
                    panierId: newPanier.id,
                    EvenementId: req.params.id,

                    


                });
               
              
                return res.status(201).json({newPanier, item});

            }
        }
//mawjouda lpanier
        else {
            const idevent = req.params.id
          
            const valid = await reservation.findOne({where: {EvenementId: idevent}});

          
            if (!valid) {
                const item2 = await reservation.create({
                    prixticket: req.body.prixticket,
                    quantite: req.body.quantite,
                    panierId: ifexist.id,
                    EvenementId: req.params.id,
                   

                })   
               
                ifexist.prixtotal+=item2.prixticket
                ifexist.save()
                return res.status(201).json({item2});
            } else {
                valid.quantite++;
                valid.save();
                ifexist.prixtotal+=valid.prixticket
                ifexist.save()
                return res.status(201).json({valid});

            }
        }
    } catch
        (error) {
        return res.status(500).json({error: error.message});
    }
}


//detete panier selon id user
const deletePanier = async (req, res) => {

    try {
        const panierofuserconected = await panier.findOne({where: {utilisateurIdUtilisateur: 1}});

        if (!panierofuserconected) {

           return res.status(404).json({message:"panier n'existe pas"})
        }

        const {idLignePanier} = req.params
        const {panierId} = req.params

        const lignepanierexiste = await reservation.findAll({
            where: {


                    id: idLignePanier



            }
        });

        if (lignepanierexiste) {

            if (lignepanierexiste[0].quantite == 1) {
                await reservation.destroy({where: {id: lignepanierexiste[0].id}})
            } else {

                lignepanierexiste[0].quantite--
                lignepanierexiste[0].save()
            }

        }
        const checkPanierHasItem= await reservation.findOne({
            where:{
                panierId:panierId
            }
        })
        console.log(checkPanierHasItem)
        if (!checkPanierHasItem) {
            await panier.destroy({where: {id: panierId}})
                return res.status(200).json({message:"panier deleted"})
        } else {
            panierofuserconected.prixtotal-=lignepanierexiste[0].prixticket

            panierofuserconected.save()
            return res.status(200).json({panierofuserconected})

    } }catch (error) {
       console.log(error.message)
    }
}
//affichier panier selon id user connecté et les images de l'event et les prixticket et quantite et prixtotal
const getPanier = async (req, res) => {
    try {
        const panierofuserconected = await panier.findOne({where: {utilisateurIdUtilisateur: 1}});
        if (!panierofuserconected) {
            return res.status(404).json({message:"panier n'existe pas"})
        }
        const lignepanier = await reservation.findAll({
            where: {
                panierId: panierofuserconected.id,
                
            },
            include: [{
                model: evenement,
                attributes: ['image','titre']
            }]
        });
        if (!lignepanier) {
            return res.status(404).json({message:"panier n'existe pas"})
        }
        return res.status(200).json({panierofuserconected, lignepanier})
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}





//Afficher panier par id
const getOnePanier = async (req, res) => {
   
        try {
            const pan = await panier.findOne({where: {utilisateurIdUtilisateur: 1}});
           
            if (!pan) {
                throw new Error("panier not found");
            }
            res.status(200).json({pan});
        } catch (error) {
            res.status(500).json({
    
                error: error.message,
            });
        }
    };



module.exports = { 
    createPanier,
    getOnePanier,
      
      deletePanier ,
      getPanier
    };
    
