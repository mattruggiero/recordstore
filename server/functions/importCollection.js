
const Record = require('../models/Record');


module.exports = {
    getAskingPrice(suggestedPriceObject){
        let valuesArray = Object.values(suggestedPriceObject);
        let suggestedPrice = valuesArray[2].value;
        let askingPrice = (suggestedPrice*10).toFixed(2);
        askingPrice++;
        return askingPrice;
    },
    isObjectFieldPresent(objectField){
        if(objectField === undefined)
            return false;
        return objectField;
    },
    populate (releaseData,releaseConditionAndPrice) {
        let newRecord = new Record({
            price: releaseConditionAndPrice.askingPrice,
            trackList : releaseData.tracklist,
            releaseID: releaseData.id,
            masterID: releaseData.master_id,
             artists: releaseData.artists,
            title: releaseData.title,
            notes:releaseData.notes_plaintext,
            formats:{
                text:releaseData.formats[0].text,
                numberOfRecords:releaseData.formats[0].qty,
                descriptions:releaseData.formats[0].descriptions
            },
            images:releaseData.images,
            labels:releaseData.labels,
            mediaCondition:releaseConditionAndPrice.mediaCondition, 
            coverCondition:releaseConditionAndPrice.coverCondition, 
        })
    
        newRecord
            .save()
            .then(console.log("SAVED: "+newRecord.title));
        
    
       
    
        
    }

}