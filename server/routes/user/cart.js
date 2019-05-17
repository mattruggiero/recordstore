const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Record = require('../../models/Record');
const jwtDecode = require('jwt-decode');

router.post('/',async (req,res) =>{
    let dirtyToken = req.headers.authorization;
    let cleanToken = dirtyToken.replace(/Bearer/g,'').trim;
    let decodedToken = jwtDecode(cleanToken);

    let userDBID = decodedToken.id;
    let recordDBID = req.body.recordDBID;
    

    //let user = await User.findOne({email:decodedToken.email}).lean();
    let user = await User.findById(decodedToken.id);
    console.log(user);
    let record = await Record.findById(recordDBID);
    //console.log(record);
    //console.log(user);
    
    
})






module.exports = router;