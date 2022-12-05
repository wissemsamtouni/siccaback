const express = require("express");
const {utilisateur} = require('../../models')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const router = express.Router();
const login = async  (req, res, next) => {
    try {
        const {login, mdp} = req.body;
        const user = await utilisateur.findOne({where: {login: login}});
        if (!user) {
            return res.status(404).json({error: "login ou mot de passe incorrect"});
        }
        const validPassword = await bcrypt.compare(mdp, user.mdp);
        if (!validPassword) {
            return res.status(400).json({error: "login ou mot de passe incorrect"});
        }
        const token = jwt.sign({id_utilisateur: user.id_utilisateur ,role:user.role,etat:user.etat}, 'secret', {
            expiresIn: 86400 // 24 hours
        });
        res.cookie('jwt', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        const claims = jwt.verify(token, 'secret');
        const x =claims.role;
        const y =claims.etat;
        res.status(200).json({message:"user connected",x,y});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }

}





const user = async (req, res, next) => {

        try {
            const cookie = req.cookies['jwt']

            const claims = jwt.verify(cookie, 'secret')

            if (!claims) {
                return res.status(401).send({
                    message: 'unauthenticated'
                })
            }

            const user = await utilisateur.findOne({id: claims.id_utilisateur})

            const {mdp, ...data} = await user.toJSON()

            res.send(data);
        } catch (err) {
            return res.status(401).send({
                message: 'inconnected'
            })
        }

}
const logout = async (req, res, next) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'logout succed'
    })

}

module.exports = {
    login,
    user,
    logout
}
