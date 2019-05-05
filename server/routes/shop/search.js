const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');

router.route('*').all((req,res,next)=>{
    console.log('Search Works: '+req.originalUrl);
    next();
})
.post(async (req,res)=>{
    let searchFor = req.body.searchInput;
    console.log(searchFor);
    console.log('search worked');
    //let results = await Record.find({artist:searchFor}).lean();
    let results = await Record.find({$text:{$search:searchFor}}).lean()
    console.log(results.length);
    res.send(results);
})


module.exports = router;