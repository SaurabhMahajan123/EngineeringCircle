const mongoose = require('mongoose');
const { Schema } = mongoose;


// Center scehma

const centerSchema = new Schema({

        "center_id": {type:Number,required:true, unique : true},
        "c_add": {type : String, required:true},
        "c_contact": {type :String},
      
        
  })

  exports.centerSchema = mongoose.model("center",centerSchema,'Center');