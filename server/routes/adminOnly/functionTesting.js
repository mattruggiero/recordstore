const express = require('express');
const router = express.Router();
const importFunctions = require('../../functions/importFunctions');
const Record = require('../../models/Record');
var async = require('async');
//var _ = require('lodash');

//working but should be split into getter/setter!!!!
router.get('/',(req,res)=>{
    importFunctions.getIDandCondition('mattrules65',1)
        .then(returnObject =>{
         var tasksQueue = async.queue(function(task,callback){
                console.log('Performing task: '+ task.name);
                console.log('Waiting to be processed: ',tasksQueue.length());
                console.log('_________________');

                setTimeout(function(){
                    callback();
                },1000);
            },1);

        for(let each in returnObject.initialData){
                let releaseID = returnObject.initialData[each].releaseID;
                let name = "processing: "+releaseID;
                tasksQueue.push({name:name},function(err){
                    importFunctions.getAskingPrice(releaseID)
                        .then(result =>{
                            console.log(each);
                            returnObject.initialData[each].askingPrice = result;
                        })
                })
                
            }
            tasksQueue.drain = ()=>{
                setTimeout(function(){
                    res.send(returnObject);
                },1000);
            }
            
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
        
            //importFunctions.setPrice(returnObject).then(results=>res.send(results));

    })
    
 });



module.exports = router;