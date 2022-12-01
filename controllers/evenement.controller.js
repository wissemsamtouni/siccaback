const {evenement } = require("../models");

const ajouterevent = async (req, res, next) => {
  const {  titre, discription, datedebut, datefin,nbrticket,disponibilite,image } = req.body;
  console.log(req.body)
  try {
    const ajouterevent = await evenement.create({
      titre, discription, datedebut, datefin,nbrticket,disponibilite,image 
    });
    res.status(201).json({
        ajouterevent,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log(error);
  }
};
const affichierevent = async (req, res) => {
  try {
    const {Idevent } = req.params;
    const eventData = await evenement.findOne({
      
    });
    if (!eventData) {
      throw new Error("Evenement not found");
    }
    res.status(200).json({
      eventData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//upload image
// const upload = async (req, res) => {
//   try {
//     if (req.file == undefined) {

//       return res.send(`You must select a file.`);
//     }

//     res.send(`File has been uploaded.`);
//   } catch (error) {
//     console.log(error);
//     return res.send(`Error when trying upload image: ${error}`);
//   }
// };

//update event
// const modifierevent = async (req, res) => {
//   try {
//     const { Idevent } = req.params;
//     const [updated] = await evenement.update(req.body, {
//       where: { id: Idevent },
//     });
//     if (updated) {

//       const updatedevent = await evenement.findOne({ where: { id: Idevent } });
//       res.status(200).json({ event: updatedevent });
//     }
//     throw new Error("Evenement not found");
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const modifierevent = async (req, res) => {
  try {
    const { Idevent } = req.params;
    const [updated] = await evenement.update(req.body, {
      where: { id: Idevent },
    });
    if (updated) {
      const modifierevent = await evenement.findOne({ where: { id: Idevent } });
      res.status(200).json({
        even: modifierevent,
      });
    }
    res.status(401).json({
     "message":"message"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      
    });
    console.log(error);
  }
};





const deleteevent = async (req, res) => {
  try {
    const { Idevent } = req.params;
    const deleted = await evenement.destroy({
      where: { id: Idevent },
    });
    if (!deleted) {
      throw new Error("evenment not found");
    }
    res.status(204).send("User deleted");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const affichiertevent= async (req, res) => {
  try {
    const event = await evenement.findAll();
    if(!event){
        throw new Error("No event found");
    }
    res.status(200).json({
      event,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }}

//parse string to date


// code filtrage par date debut et titre
const filtrageevent = async (req, res) =>{
  try{
    const { titre}=req.params;
     
    const event = await evenement.findAll({
      where: {
        
        titre:titre

      }
    });
    if(!event){
      throw new Error("No event found");

    }
    res.status(200).json({
      event,
    });
  } catch (error) {
    res.status(500).json({

      error: error.message,



    });


  }
}
  




  
module.exports = {
  ajouterevent,
  affichierevent,
  modifierevent,
  deleteevent,
  affichiertevent,
  filtrageevent,

  
};
