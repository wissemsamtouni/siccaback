const { panier, reservation, evenement } = require("../models");
const createpanier = async (req, res) => {
    const { quantite, prixticket } = req.body;
   
    try {
        const newpanier = await panier.findOne({
            where: { utilisateurIdUtilisateur: 5 }
        })
        if (console.log(!newpanier)) {
            const createpanier = await panier.create({
                prixtotal:prixticket * quantite,

                utilisateurIdUtilisateur: 5,
            }).catch(err => console.log(err))

            if (createpanier) {

                const idevent = req.params.idevent;
                const event = await evenement.findOne({ where: { id: idevent } });


                const RES = await reservation.create({
                   prixticket: req.body.prixticket,
                    quantite: req.body.quantite,
                    panierId: createpanier.id,
                    EvenementId: event.id,
                    //
                    prixticket: event.prixticket,

                });
                return res.status(200).json({ createpanier, RES });
            }



        }
        else {
            const idevent = req.params.idevent;
            const valid = await reservation.findOne({ where: { EvenementId: idevent } });
            if (!valid) {
                const event = await reservation.findOne({
                   prixticket: req.body.prixticket,
                    quantite: req.body.quantite,
                    panierId: newpanier.id,
                    EvenementId: event.id,
                    //prixticket: event.prixticket,

                });
                return res.status(200).json({ event });
            } else {
                
                valid.prixtotal += (valid.prixticket * valid.quantite);
                
                valid.quantite++;
               
                valid.save();
                return res.status(200).json({ valid });
            }
        }

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}


const affichertpanier = async (req, res, next) => {
    try {
        const pan = await panier.findAll();
        if (!pan) {
            throw new Error("panier not found");
        }
        res.status(200).json({ pan });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }



};





//afficjietr panier par id  user 
const afficherIdpanier = async (req, res, next) => {
    try {
        const pan = await panier.findOne({ where: { utilisateurIdUtilisateur: req.params.idpanier } });
        if (!pan) {
            throw new Error("panier not found");
        }
        res.status(200).json({ pan });
    } catch (error) {
        res.status(500).json({

            error: error.message,
        });
    }
};

//delete panier selon id reservation 

const deletereservation = async (req, res, next) => {
    try {
        const pan = await panier.findOne({ where: { utilisateurIdUtilisateur: req.params.idpanier } });
        if (!pan) {
            throw new Error("panier not found");
        }
        const reser = await reservation.findOne({ where: { id: req.params.idreservation } });
        if (!reser) {
            throw new Error("reservation not found");
        }
        const deleted = await reservation.destroy({
            where: { id: req.params.idreservation },
        });
        if (!deleted) {
            throw new Error("reservation not found");

        }
        res.status(204).send("reservation deleted");
    } catch (error) {

        res.status(500).json({
            error: error.message,
        });
    }
};




module.exports = { 
    createpanier,
     affichertpanier,
      afficherIdpanier, 
      
      deletereservation 
    };
    
