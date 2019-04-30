const express = require('express');
const router = express.Router();
const importFunctions = require('../../functions/importFunctions');


router.get('/',(req,res)=>{
    let allID = [];
    
    importFunctions.getNumberOfPages('mattrules65')
    .then(numberOfPages => {
        nums = numberOfPages;
        console.log("Num Pages: " + numberOfPages);
    })
    
    importFunctions.getReleaseIDs('mattrules65',1)
        .then(returnObject =>{
            for(let id in returnObject.idArray){
                allID.push(returnObject.idArray[id]);
            }
            res.send(returnObject.idArray);
        })
    
 });
    


module.exports = router;