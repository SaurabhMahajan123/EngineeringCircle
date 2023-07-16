const mongoose = require('mongoose');
const { Schema } = mongoose;
// Center scehma

const designationSchema = new Schema({

        "e-desig": {type:String,required:true},
        "e_level": {type : Number, required:true,unique : true},
        "c_salary": {type : Number,required:true},
        
        
  })

  exports.designationSchema = mongoose.model("designation",designationSchema,'Designation');