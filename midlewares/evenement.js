const yup = require("yup");
const validateevent = async (req, res, next) => {
  try {
    const schema = yup.object().shape({
        titre: yup.string().required(),
        discription: yup.string().required(),
        datedebut: yup.string().required(),
        datefin: yup.string().required(),
        nbrticket: yup.number().required(),
        disponibilite: yup.boolean().required(),
        image: yup.string().required(),
    });  
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
 
module.exports = validateevent;
