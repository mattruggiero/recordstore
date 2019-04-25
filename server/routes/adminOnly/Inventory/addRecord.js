
/* eslint-disable no-loop-func */
const express = require('express');
const router = express.Router();
const Discogs = require( 'disconnect' ).Client;
const populate = require('../../../functions/populate');
const keys = require('../../../config/keys');


const myDiscogsUserName = keys.myDiscogsUserName;
const myDiscogsAPIkey = keys.myDiscogsAPIkey;

const Record = require('../../../models/Record');
let isEmpty = require('../../../validator/isEmpty');


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
    let pageNumber = 1;
    const perPage = 100;
    let currentPage = 1;
    let numberOfPages = 100;

    //while(pageNumber <= numberOfPages){
    let go = true;
    while(go){
        go = false;
    discogsCollection.getReleases(myDiscogsUserName,1,{page:pageNumber, per_page:perPage},(err,dataFromCollection) => {
        numberOfPages = dataFromCollection.pagination.pages;
        currentPage = dataFromCollection.pagination.page;
        while(releaseNumber < perPage){
        const releaseID = dataFromCollection.releases[releaseNumber].id;
        Record.findOne({releaseID:releaseID}).then(recordIsInDB=>{
            if(recordIsInDB) 
                console.log(recordIsInDB.title + " is already in the DB");
            else{
                
                discogsMarketPlace.getPriceSuggestions(releaseID)
                
                    .then(priceSuggestion =>{ 
                        const recordCondition = isObjectFieldPresent(dataFromCollection.releases[releaseNumber].notes);
                        console.log(recordCondition);
                        
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
                    })
                }
            })
            releaseNumber++;

            setTimeout(function(){
                console.log("Timeout")
            },5000)
        }
        pageNumber++;
            
            
            
        
    })}
    res.send("WORKED");
   })
module.exports = router;