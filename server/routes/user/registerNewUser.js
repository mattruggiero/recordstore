const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const validateRegisterInput = require('../../validator/validateNewUser');


router.get('/', (req,res) => {
    res.send("<h1>CREATE USER OK</h1>");
})
.post('/', (req, res) => {
    //needs to have confirmPassword field 
    let msg = validateRegisterInput(req.body);
    
    
    res.send(msg);
    
    // let newUser = new User({
    //     email: req.body.email,
    //     password:req.body.password,
    //     userName:req.body.userName,
    //     firstName:req.body.firstName,
    //     lastName:req.body.lastName,
    //     street:req.body.street,
    //     aptNumber:req.body.aptNumber || '',
    //     city:req.body.city,
    //     zipCode: req.body.zipCode,
    //     state: req.body.state,
    //     country: req.body.country
    // })



    // bcrypt.genSalt(10,(err,salt)=>{
    //     bcrypt.hash(newUser.password,salt,(err,hash)=>{
    //         if (err){throw err;}
    //         newUser.password = hash;
    //         newUser 
    //             .save()
    //             .then(user => res.json(user))
    //             .catch(err => console.log(err));
    //             console.log(newUser.firstName+' has been entered in the DB');
    //     })
    // })
  
    
})




module.exports = router;