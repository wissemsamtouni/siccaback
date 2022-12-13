const { utilisateur } = require("../models");
const bcrypt = require('bcrypt');

const createUser = async (req, res, next) => {
    try {
        const {nom, prenom, mail, login, mdp, tel, role, adresse, code, etat } = req.body;
        const ifemailexist = await utilisateur.findOne({where: {login: login}});

        if (ifemailexist) {
            throw new Error("login deja exist");
        }
        const newUser = await utilisateur.create({nom, prenom, mail, login, mdp, tel, role, adresse, code, etat  });
        return res.status(201).json({user: newUser});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};
// console.log("aaa");
// let User = req.body;
// console.log(User.idUser);


const updateUser = async (req, res) => {
     let User = req.body;
 console.log(User.idUser);
    console.log(User.prenom);


    try {

        const [updated] = await utilisateur.update({prenom:User.prenom,nom:User.nom,mail:User.mail,tel:User.tel,login:User.login,adresse:User.adresse}, {
            where: { id_utilisateur: User.idUser },
        });
        if (!updated) {
            throw new Error("User not found");
        }
        res.status(200).json({
            updated,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }


};
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deleted = await utilisateur.destroy({
            where: { id_utilisateur: userId },
        });
        if (!deleted) {
            throw new Error("User not found");
        }
        res.status(204).send("User deleted");
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await utilisateur.findAll();
        if(!users){
            throw new Error("No users found");
        }
        res.status(200).json({
            users,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const userData = await utilisateur.findOne({
            where: { id_utilisateur: userId },
        });
        if (!userData) {
            throw new Error("User not found");
        }
        res.status(200).json({
            userData,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
const changePassword = async (req, res) => {
    try {

        let User = req.body;

        const user = await utilisateur.findOne({
            where: { id_utilisateur: User.idUser },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(User.oldPassword, user.mdp);
        if (!isPasswordValid) {
            throw new Error("Password is not valid");
        }
        const hashedPassword = await bcrypt.hash(User.newPassword, 10);
        const updated = await utilisateur.update(
            { mdp: hashedPassword },
            { where: { id_utilisateur: User.idUser } }
        );
        if (!updated) {
            throw new Error("User not found");
        }
        res.status(200).json({
            updated,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}


module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUser,
    changePassword
};
