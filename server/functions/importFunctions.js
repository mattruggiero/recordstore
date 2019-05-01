const DB = require('../config/discogs');

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
    //1 api call
    async getIDandCondition(discogsUserName,pageNumber){
        let perPage = 10;
        let returnObject = {allDone:false,initialData:[]};
        try{
            let results = await DB.discogsCollection.getReleases(discogsUserName,1,{page:pageNumber,per_page:perPage});
            for (let each in results.releases){
                let tempObject = {
                    releaseID: results.releases[each].id,
                    mediaCondition:this.getMediaCondition(results.releases[each].notes),
                    coverCondition:this.getMediaCondition(results.releases[each].notes),
                }
                returnObject.initialData.push(tempObject);
            }
            return returnObject;
        }
        catch(error){
            returnObject.allDone = true;
            return returnObject;
        }
    },
    //1 api call
    async getAskingPrice(releaseID){
        try{
            let results = await DB.discogsMarketPlace.getPriceSuggestions(releaseID);
            let valuesArray = Object.values(results);
            let suggestedPrice = (valuesArray[2].value * 10).toFixed(2);
            return suggestedPrice++;
        }
        catch(error){
            console.log("error in importFunctions.getAskingPrice");
            return(error);
        }
    },
    //n api calls
    async setPrice(recordData){
        try{
            console.log("setting price");
            let initialData = recordData.initialData;
            for(let each of initialData){
                each.askingPrice = await this.getAskingPrice(each.releaseID);
            }
            return recordData;
        }catch(error){
            console.log("ERROR @ importFunctions.setPrice");
            return error;
        }
    }


    

    
   
    


    
}

    
