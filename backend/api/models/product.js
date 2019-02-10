const mongoose = require('mongoose');
//const Schema = mongoose.Schmea; 'sama aja kek yang di bawah'
const {Schema} = mongoose;

const productSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,  
    name : {type : String, required : true},
    price : {type : Number, required : true},
    itemFood : {type : String, required : true},
    productImage : {type : String, required : true}
});

// model class dengan nama product
module.exports = mongoose.model('Product',productSchema);

