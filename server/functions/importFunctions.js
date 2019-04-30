/* eslint-disable no-loop-func */

const express = require('express');
const router = express.Router();
const Discogs = require( 'disconnect' ).Client;
const keys = require('../config/keys');
const myDiscogsUserName = keys.myDiscogsUserName;
const myDiscogsAPIkey = keys.myDiscogsAPIkey;
const Record = require('../models/Record');
const CollectionData = require('../models/CollectionData');
const discogsClient = new Discogs({userToken: myDiscogsAPIkey});
discogsClient.setConfig({outputFormat:'plaintext'});
const discogsDB = discogsClient.database();
const discogsCollection = discogsClient.user().collection();
const discogsMarketPlace = discogsClient.marketplace();

module.exports = {

    isObjectFieldPresent(objectField){
        if(objectField === undefined)
            return false;
        return objectField;
    },
    getMediaCondition(notesField){
        let isFieldPresent = this.isObjectFieldPresent(notesField);
        let mediaCondition = isFieldPresent? notesField[0].value: "Very Good Plus (VG+)";
        return mediaCondition;
    },

    getCoverCondition(notesField){
        let isFieldPresent = this.isObjectFieldPresent(notesField);
        let coverCondition = isFieldPresent? notesField[0].value: "Very Good Plus (VG+)";
        return coverCondition;
    },

    getIDandCondition(discogsUserName, pageNumber){
        let perPage = 100;
        let tempObject;
        let returnObject = {
            allDone:false,
            initialData:[]
            }
        let returnValue = discogsCollection.getReleases(discogsUserName,1,{page:pageNumber, per_page:perPage})
            .then((results,error) => {
                for(let each in results.releases){
                    //returnObject.idArray.push(results.releases[id].id);
                    tempObject = {
                        releaseID: results.releases[each].id,
                        mediaCondition: this.getMediaCondition(results.releases[each].notes),
                        coverCondition: this.getCoverCondition(results.releases[each].notes)
                    }
                    returnObject.initialData.push(tempObject);
                }
                return returnObject;
            })
            .catch(error =>{
                returnObject.allDone = true;
                return returnObject;
            })
         return returnValue;
    },
   

    getAskingPrice(releaseID){
        let askingPrice = discogsMarketPlace.getPriceSuggestions(releaseID)
            .then(priceSuggestion => {
                let valuesArray = Object.values(priceSuggestion);
                let suggestedPrice = valuesArray[2].value;
                console.log(suggestedPrice);
                let finalPrice = (suggestedPrice*10).toFixed(2);
                finalPrice++;
                return finalPrice;
            })
            return askingPrice;
        },

    getNumberOfPages(discogsUserName){
        let numberOfPages = discogsCollection.getReleases(discogsUserName,1,{per_page:100})
            .then(results => {
                //console.log(results.pagination);
                return results.pagination.pages;
            })
            return numberOfPages;
        
    },
   


    
}

    
