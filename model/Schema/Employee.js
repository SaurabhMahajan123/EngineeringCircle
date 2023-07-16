const mongoose = require('mongoose');
const { Schema } = mongoose;
// const center = require('../Schema/Centers');
// const designation = require('../Schema/Designations');

// employee scehma

const empSchema = new Schema({

        "e_id": {type:String,required:true,unique : true},
        "e_name": {type : String, required:true},
        "e_email": {type : String,required:true},
        "e_mob_no":  {type : Number,required:true},
        "e_permanent_add": {type : String,required:true},
        "e_center_id":  {type: Number,required: true},
        "e_designation":{type:String,required: true},
        "e_doj":{type: Date,required: true},
        "e_dor":{type: Date}

  })

  exports.empSchema = mongoose.model("employee",empSchema,'Employee');



