const mongoose = require('mongoose');
const { Schema } = mongoose;
// const center = require('../Schema/Centers');
// const designation = require('../Schema/Designations');

// employee scehma

const studentSchema = new Schema({

        "s_id": {type:String,required:true,unique : true},
        "s_name": {type : String, required:true},
        "s_email": {type : String,required:true},
        "s_mob_no":  {type : Number,required:true},
        "s_address": {type : String,required:true},
        "s_dob":  {type: Date,required: true},
        "s_center_id":{type: Number,required: true},
        "s_course_id":{type: String,required: true},
        "s_doa":{type: Date,required: true},
        "s_feepaid":{type: Number},
        "s_dor":{type:Date}

  })

  exports.studentSchema = mongoose.model("student",studentSchema,'Students');



