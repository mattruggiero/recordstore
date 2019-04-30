
/* eslint-disable no-loop-func */
const express = require('express');
const router = express.Router();
const Discogs = require( 'disconnect' ).Client;
const keys = require('../../../config/keys');
const myDiscogsUserName = keys.myDiscogsUserName;
const myDiscogsAPIkey = keys.myDiscogsAPIkey;
const Record = require('../../../models/Record');
const discogsClient = new Discogs({userToken: myDiscogsAPIkey});
discogsClient.setConfig({outputFormat:'plaintext'});
const discogsDB = discogsClient.database();
const discogsCollection = discogsClient.user().collection();
const discogsMarketPlace = discogsClient.marketplace();
const ImportHelper = require('../../../functions/importCollection');

function sleep(milliSeconds){
    return new Promise(resolve => 
        setTimeout(resolve,milliSeconds)); 
}
async function wait(){
    console.log("waiting");
    await sleep(2000);
    console.log("done waiting");
}

function addRecord(releaseNumber,pageNumber,perPage){
  discogsCollection.getReleases(myDiscogsUserName,1,{page:pageNumber, per_page:perPage},(err,dataFromCollection) => {
        const releaseID = dataFromCollection.releases[releaseNumber].id;
        Record.findOne({releaseID:releaseID}).then(recordIsInDB=>{
            if(recordIsInDB) {
                console.log(recordIsInDB.title + " is already in the DB");
            }
            else{
                discogsMarketPlace.getPriceSuggestions(releaseID)
                .then(priceSuggestion =>{ 
                        const recordCondition = ImportHelper.isObjectFieldPresent(dataFromCollection.releases[releaseNumber].notes);
                        let releaseConditionAndPrice = {
                            releaseID:releaseID,
                            askingPrice: ImportHelper.getAskingPrice(priceSuggestion),
                            mediaCondition:recordCondition ? recordCondition[0].value: "Very Good Plus (VG+)",
                            coverCondition:recordCondition ? recordCondition[1].value: "Very Good Plus (VG+)",
                        }
                    return releaseConditionAndPrice;
                    }).then(wait())
                    .then(releaseConditionAndPrice =>{
                        discogsDB.getRelease(releaseConditionAndPrice.releaseID)
                        .then(releaseData =>{
                            ImportHelper.populate(releaseData,releaseConditionAndPrice);
                        })
                        .then(wait())
                    })//after populate
            }//else branch
        })//record.findone
    })//collection serach
    
    

}


router.get('/',(req,res)=>{
    let releaseNumber = 0;
    let perPage = 30;
    let pageNumber = 1;

  
    while(releaseNumber < perPage){
        addRecord(releaseNumber,pageNumber,perPage);
        
        releaseNumber++;
    }
    console.log("done");
    
    res.send("worked");
})
module.exports = router;