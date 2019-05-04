const express = require('express');
const router = express.Router();
const Record =require('../../models/Record');

//once front end route is complete, change to post
//program logic for prev/next buttons;

router.get('/', async (req,res) => {
    //pagination
    let numberOfRecords = await Record.countDocuments();
    if(!numberOfRecords){res.send("No records in store")};
    let pageNumber = 3;
    let numberOfResults = 150;
    let totalPages = numberOfRecords/numberOfResults;
    if((pageNumber > totalPages)||(pageNumber < 0)) {pageNumber = 0}
    let numberToSkip = numberOfResults * pageNumber;
    
    let records = await Record.find().limit(numberOfResults).skip(numberToSkip).lean();
    let returnObject = {recordData:records,pageNumber:pageNumber};
    res.send(returnObject);
})









module.exports = router;