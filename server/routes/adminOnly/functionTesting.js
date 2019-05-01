const express = require('express');
const router = express.Router();
const importFunctions = require('../../functions/importFunctions');
const Record = require('../../models/Record');

//working but should be split into getter/setter!!!!
router.get('/',(req,res)=>{
    importFunctions.getIDandCondition('mattrules65',1)
        .then(returnObject =>{
            let recordData = returnObject.initialData;
            // for(let each in returnObject.initialData){
            //     let newRecord = new Record({
            //                 releaseID:recordData[each].releaseID,
            //                 mediaCondition:recordData[each].mediaCondition,
            //                 coverCondition:recordData[each].coverCondition,
            //             })
            //         newRecord.save((err)=>{
            //                 if(err)
            //                     console.log("loser");
            //                 else
            //                     console.log("saved");
            //             })
            // }
        
            importFunctions.setPrice(returnObject).then(results=>res.send(results));

    })
    
 });



module.exports = router;