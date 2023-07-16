const model = require("../model/Schema/Course");
const courseSchema = model.courseSchema;


//get  course
exports.getCourse = async (req, resp) => {
 
  if (req.params.id == null) {
    const allCourses = await courseSchema.find();
    resp.render('Courses',{allCourses});

    

  } else if (req.params != null) {
    const data = await courseSchema.findOne({ s_course_id: { $eq: req.params.id } });

    if (data === null) {
      resp.status(404).send("Not Found");
    } else {
      resp.status(200).send(data);
    }
  }
};

// create new course
exports.courseCreate = async (req, resp) => {
  const course = new courseSchema(req.body);

  try {
    await course.save();

    resp.status(201).send("Created");
  } catch (e) {
    resp.status(400).send(e);
  }
};

// update existing course
exports.courseUpdate = async (req, resp) => {
  const pid = req.params.id;

  try {
    const a = await courseSchema.findOneAndUpdate({ s_course_id: pid }, req.body, {
      new: true,
    });

    if (a == null) {
      resp.status(404).send("Not Found");
    } else {
      resp.status(201).send("updated");
    }
  } catch (e) {
    resp.status(400).send(e);
  }
};

// delete existing employee
exports.courseDelete = async (req, resp) => {
  const pid = req.params.id;

  try {
    //const empIndex = empSchema.findIndex((emp) => emp.e_id === pid);

    const std =  await courseSchema.findOneAndDelete({ s_course_id: pid },{rawResult: true})
  
    if(std.lastErrorObject.n === 1){
      resp.status(201).send("deleted");
    }else{
      resp.status(400).send("data not found which need to be deleted")
    }

    
  } catch (error) {
    resp.status(400).send(error);
  }
};
