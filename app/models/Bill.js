var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var BillSchema = new Schema({
	billNumber:{type:Number,required:true},
	rating:{type:Number,"default":0,min:0,max:5},
	comment:{type:String}
});


module.exports = mongoose.model('Bill', BillSchema);