var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name : {type:String,require:true},
    class : {type:Number,require:true},
    rollNo : {type:Number,require:true},
    event : {type:String,require:true},
})

module.exports = mongoose.model('ArtEvent',schema);