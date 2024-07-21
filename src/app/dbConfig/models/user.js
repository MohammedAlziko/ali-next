
const mongo =require("mongoose");

const Schema =mongo.Schema;

const models =mongo.models;


const userSchema =new Schema({
name:String,
email:String,
password:String
})

const UserModal = models.User ||mongo.model("User",userSchema)


module.exports =UserModal;





