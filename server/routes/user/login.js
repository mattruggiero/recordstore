const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const User = require('../../models/User');
const passport = require('passport');

const validateLoginInput = require('../../validator/validateLogin');


router.get('/',passport.authenticate('jwt',{ session: false}),(req,res)=>{
    res.json({
        id: req.user.id,
        email:req.body.email,
        userName:req.body.userName
    })
})
.post('/', async (req,res) => {
    try{
        const { errors, isValid } = validateLoginInput(req.body);
        console.log(errors);
        if(!isValid){return res.status(400).json(errors)};

        const email = req.body.email;
        const password = req.body.password;

        let user = await User.findOne ({ email });
        if(!user){return res.json({success:false,errors:"user not found"})}

        let passwordMatches = await bcrypt.compare(password, user.password);
        if(passwordMatches){
            const payload = {
                id: user.id, 
                email: user.email, 
                userName: user.userName,
                //app does not like cart being here for some reason
                //cart:user.cart

            }

            jwt.sign(payload, keys.secretOrKey,{expiresIn: 36000}, (error,token) =>{
                if(error){console.log(error)}
                res.json({success:true,token: 'Bearer ' + token});
            })
        }
        else{ res.json({success:false,error:"invalid credentials"})}
    }
    catch(error){res.json({success:false,error})}


})

module.exports =  router;
// .post((req,res) => {
//     const { errors, isValid } = validateLoginInput(req.body);
//     if(!isValid){return res.json(errors)}


//     const email = req.body.email;
//     const password = req.body.password;

//     User.findOne({ email }).then(user=>{
//         if(!user){
//             return res.json({
//                 success:false,
//                 error: "invalid credentials"
//             });
//         }

//         bcrypt.compare(password, user.password).then(passwordMatches => {
//             if(passwordMatches){
//                 const payload = {
//                     id: user.id, 
//                     email:user.email,
//                     userName:user.userName,
//                 };

//                 jwt.sign(payload, keys.secretOrKey,{expiresIn: 36000}, (err,token)=>{
//                     res.json({
//                         success: true,
//                         token: 'Bearer ' + token
//                     })
//                 })
//             }
//             else{
//                 res.json({
//                     success:false,
//                     error: "invalid credentials"
//                 })
//             }
//         })
//     })
// })


//module.exports = router;