const yup = require("yup");
const validate = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            nom: yup.string().required(),
            prenom: yup.string().required(),
            mail: yup.string().required(),
            login: yup.string().required(),
            mdp: yup.string().required(),
            tel: yup.number().required(),
            role: yup.string().required(),
            adresse: yup.string().required(),
            code: yup.number().required(),
            etat: yup.string().required(),
        });
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        res.status(400).json({
            error: error.errors,
        });
    }
};
module.exports = validate;
