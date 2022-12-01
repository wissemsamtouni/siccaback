const express = require("express");
const {utilisateur} = require('../../models')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const router = express.Router();
const login = async  (req, res, next)=> {
    const user = await utilisateur.findOne({
    where:{
        login:req.body.login
    }
})
    console.log(user)
    if(!user){
        return res.status(404).send({
            message:"user noy found"
        })
    }
    const isMatch = await bcrypt.compare(req.body.mdp,user.mdp)
    console.log(isMatch)
    if(!isMatch){
        return res.status(400).send({
            message:"invalid credentiel"
        })
    }
    const jwtToken =jwt.sign({_id:user.id_utilisateur},"secret")
    res.cookie("jwt",jwtToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    res.send({
        message: 'success'
    })
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

            const user = await utilisateur.findOne({_id: claims.id_utilisateur})

            const {mdp, ...data} = await user.toJSON()

            res.send(data)
        } catch (e) {
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
