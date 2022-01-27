const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId, 
    fileName:{
        type:String
    },
    templateTitle : {type:String, require:true},
},{collection: 'templates'});

module.exports = mongoose.model('Uploadfile', uploadSchema);