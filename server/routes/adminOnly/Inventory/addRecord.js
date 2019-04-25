
/* eslint-disable no-loop-func */
const express = require('express');
const router = express.Router();
const Discogs = require( 'disconnect' ).Client;
const populate = require('../../../functions/populate');
const keys = require('../../../config/keys');


const myDiscogsUserName = keys.myDiscogsUserName;
const myDiscogsAPIkey = keys.myDiscogsAPIkey;

const Record = require('../../../models/Record');


const discogsClient = new Discogs({userToken: myDiscogsAPIkey});
discogsClient.setConfig({outputFormat:'plaintext'});
const discogsDB = discogsClient.database();
const discogsCollection = discogsClient.user().collection();
const discogsMarketPlace = discogsClient.marketplace();


function getAskingPrice(suggestedPriceObject){
    let valuesArray = Object.values(suggestedPriceObject);
    let suggestedPrice = valuesArray[2].value;
    let askingPrice = (suggestedPrice*10).toFixed(2);
    askingPrice++;
    return askingPrice;
}

function isObjectFieldPresent(objectField){
    if(objectField === undefined)
        return false;
    return objectField;
}

router.get('/',(req,res) => {
    let releaseNumber = 0;
    let pageNumber = 2;
    let keepGoing = true;
    const perPage = 10;
    let testNumber = 10;

    while(testNumber--){
    discogsCollection.getReleases(myDiscogsUserName,1,{page:pageNumber, per_page:perPage},(err,dataFromCollection) => {
        const numberOfReleasesOnPage = dataFromCollection.releases.length;
        const releaseID = dataFromCollection.releases[releaseNumber].id;
        Record.findOne({releaseID:releaseID}).then(recordIsInDB=>{
            if(recordIsInDB) 
                console.log(recordIsInDB.title + " is already in the DB");
            else{
                const recordCondition = isObjectFieldPresent(dataFromCollection.releases[releaseNumber].notes);
                discogsMarketPlace.getPriceSuggestions(releaseID)
                    .then(priceSuggestion =>{ 
                        let askingPrice = getAskingPrice(priceSuggestion);
                        let releaseConditionAndPrice = {
                            releaseID:releaseID,
                            askingPrice:askingPrice,
                            mediaCondition:recordCondition ? recordCondition[0].value: "Very Good Plus (VG+)",
                            coverCondition:recordCondition ? recordCondition[1].value: "Very Good Plus (VG+)",
                    }
                    return releaseConditionAndPrice;
                    })
                    .then(releaseConditionAndPrice =>{
                        discogsDB.getRelease(releaseConditionAndPrice.releaseID)
                        .then(releaseData =>{
                            populate(releaseData,releaseConditionAndPrice);
                        })
                    })}
            })
            releaseNumber++;
            
        
    })}
    res.send("WORKED");
   })
module.exports = router;