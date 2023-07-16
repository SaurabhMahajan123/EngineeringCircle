const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({

    "admin_id": { type:String,unique:true,required:true},
    "admin_pass" :{type:String,required:true},
    "admin_name":{type:String,required:true}


})


exports.adminSchema = mongoose.model("admin",adminSchema,'Admin');

