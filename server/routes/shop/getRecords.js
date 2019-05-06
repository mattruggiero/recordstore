const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');

router.route('*').all((req,res,next)=>{
    console.log('Get Results Route Works: '+req.originalUrl);
    next();
})
.post(async (req,res)=>{
    try{
        let searchInput = req.body.searchInput;
        let resultLimit = 10;
        //let pageNumber = req.body.pageNumber;
        let pageNumber = 3;
        let numberOfRecords = searchInput? 
            await Record.countDocuments({$text:{$search:searchInput}}).lean():
            await Record.countDocuments().lean();
    
        console.log(numberOfRecords);

        if(!numberOfRecords && !searchInput)
            throw new Error('no records');
            
        if(!numberOfRecords)
            searchInput = false;

        let totalPages = numberOfRecords/resultLimit;
        if(numberOfRecords%resultLimit)
            totalPages++;

        if(pageNumber > totalPages) {pageNumber = 1};
        if(pageNumber < 1){pageNumber = totalPages};

        let numberToSkip = resultLimit * (pageNumber-1);
        let records = searchInput?
            await Record.find({$text:{$search:searchInput}}).skip(numberToSkip).limit(resultLimit).lean():
            await Record.find().limit(resultLimit).skip(numberToSkip).lean();

        let returnObject = {recordData:records,pageNumber:pageNumber};
        res.send(returnObject);
    }
    catch(error){
        console.log(error)
        res.send(false);
    }
})


module.exports = router;
