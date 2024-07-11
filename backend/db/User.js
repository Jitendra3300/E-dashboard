const mongoose=require ('mongoose');

mongoose.set('strictQuery', false);

const userSchema=new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    contact:Number,
    password:String,
    address:String
});

module.exports=mongoose.model("users",userSchema);