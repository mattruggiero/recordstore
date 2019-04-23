const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const User = require('../../models/User');



router.post('/', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user=>{
        if(!user){
            return res.json({
                error: "invalid credentials"
            });
        }
        bcrypt.compare(password, user.password).then(passwordMatches => {
            if(passwordMatches){
                const payload = {
                    id: user.id, 
                    firstName: user.firstName,
                    lastName: user.lastName,
                };
                jwt.sign(payload, keys.secretOrKey,{expiresIn: 36000}, (err,token)=>{
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })
                })
            }
            else{
                res.json({
                    error: "invalid credentials"
                })
            }
        })
    })
})

module.exports = router;