const mongoose = require('mongoose');
//const Schema = mongoose.Schmea; 'sama aja kek yang di bawah'
const {Schema} = mongoose;

const userSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,  
    email : {
        type :  String , 
        required : true,
        // validate if this email is true email with regex
        unique : true,
        //regex and i dont understand for this code, because how it can validate the true email?
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password : {type : String , required : true}
});

// model class dengan nama product
module.exports = mongoose.model('User',userSchema);

