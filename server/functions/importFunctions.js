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
    getReleaseIDs(discogsUserName, pageNumber){

        let perPage = 100;
        let id;
        let returnObject = {
            allDone:false,
            idArray:[]
        }
        
        let returnValue = discogsCollection.getReleases(discogsUserName,1,{page:pageNumber, per_page:perPage})
            .then((results,error) => {
                for(id in results.releases){
                    returnObject.idArray.push(results.releases[id].id);
                }
                console.log(returnObject.idArray.length);
                return returnObject;
            })
            .catch(error =>{
                returnObject.allDone = true;
                return returnObject;
            })
         return returnValue;
    },
    getNumberOfPages(discogsUserName){
        let numberOfPages = discogsCollection.getReleases(discogsUserName,1,{per_page:100})
            .then(results => {
                console.log(results.pagination);
                return results.pagination.pages;
            })
            return numberOfPages;
        
    }
    
        

    
}