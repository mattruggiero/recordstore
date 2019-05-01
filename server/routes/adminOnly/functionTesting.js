const express = require('express');
const router = express.Router();
const importFunctions = require('../../functions/importFunctions');
const Record = require('../../models/Record');
var async = require('async');
var _ = require('lodash');

//working but should be split into getter/setter!!!!
router.get('/',(req,res)=>{
    importFunctions.getIDandCondition('mattrules65',1)
        .then(returnObject =>{
            let a = importFunctions.getAskingPrice(returnObject.initialData[0].releaseID)
                .then(result=>{
                    console.log(result);
                    returnObject.initialData[0].askingPrice = result;
                });
            //var tasksList =_.times(returnObject.initialData.length,_.uniqueId.bind(null,'task_'));
            var tasksList = _.times(10,_.uniqueId.bind(a,"adding "));

            var tasksQueue = async.queue(function(task,callback){
                console.log('Performing task: '+ task.name);
                console.log('Waiting to be processed: ',tasksQueue.length());
                console.log('_________________');

                setTimeout(function(){
                    callback();
                },1000);
            },1);

            tasksQueue.drain = ()=>{
                console.log(returnObject);
                res.send("DONE");
            }

            _.each(tasksList,function(task){
                tasksQueue.push({name:task},function(err){
                    if(err){console.log(err)};
                })
            })
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