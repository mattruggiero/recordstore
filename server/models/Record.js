const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    releaseID:{
        type:String,
        unique:true
    },
    masterID:{
        type:String
    }, 
    price:{
        type:String
    },
    artists:{
        type:[Object]
    },
    title:{
        type:String
    },
    trackList:{
        type: Object
    },
    notes:{
        type:String
    },
    formats:{
        text:{
            type:String,
        },
        numberOfRecords:{
            type:String
        },
        descriptions:{
            type:[String]
        }
    },
    images:{
        type:[Object]
    },
    labels:{
        type:[Object]
    },
    mediaCondition:{
        type: String
    },
    coverCondition:{
        type: String
    }, 
    readyToDisplay: {
        type: Boolean, 
        default:false
    }

    
});






// eslint-disable-next-line no-undef
module.exports = Record = mongoose.model('record', RecordSchema);
//module.exports = User = mongoose.model('users', UserSchema);