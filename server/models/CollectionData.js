const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionDataSchema = new Schema({
    collectionID:{
        type:Number
    },
    totalReleases: {
        type:Number
    },
    IDarray:{
        type: [Number]
    }
    
});






// eslint-disable-next-line no-undef
module.exports = CollectionData = mongoose.model('collectonData', CollectionDataSchema);
//module.exports = User = mongoose.model('users', UserSchema);