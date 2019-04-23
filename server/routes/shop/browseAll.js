const express = require('express');
const router = express.Router();
const mongoDB = require('../../config/keys').mongoURI;

const Record =require('../../models/Record');

router.get('/',(req,res)=>{
    Record.find()
        .then(records => {
            res.send(records);
        })
    
})









module.exports = router;