const mongoose = require('mongoose');
const { Schema } = mongoose;
// const center = require('../Schema/Centers');
// const designation = require('../Schema/Designations');

// employee scehma

const courseSchema = new Schema({

        "s_course_id": {type:String,required:true,unique : true},
        "c_name": {type : String},
        "c_duration": {type : String,required:true},
        "c_fees":  {type : Number,required:true},
        "c_subject":[{type:String}],
        "c_benefits":{type: String}
  })

  exports.courseSchema = mongoose.model("course",courseSchema,'Course');



