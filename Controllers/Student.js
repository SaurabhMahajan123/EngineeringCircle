const model = require("../model/Schema/Student");
const studentSchema = model.studentSchema;


//get  employee
exports.getStudent = async (req, resp) => {
  if (req.params.id == null) {
    const all = await studentSchema.find();
    resp.status(200).send(all);
  } else if (req.params != null) {
    const data = await studentSchema.findOne({ s_id: { $eq: req.params.id } });

    if (data === null) {
      resp.status(404).send("Not Found");
    } else {
      resp.status(200).send(data);
    }
  }
};

// create new student
exports.studentCreate = async (req, resp) => {
  const student = new studentSchema(req.body);

  try {
    await student.save();

    resp.status(201).send("Created");
  } catch (e) {
    resp.status(400).send(e);
  }
};

// update existing employee
exports.studentUpdate = async (req, resp) => {
  const pid = req.params.id;

  try {
    const a = await studentSchema.findOneAndUpdate({ s_id: pid }, req.body, {
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
exports.studentDelete = async (req, resp) => {
  const pid = req.params.id;

  try {
    //const empIndex = empSchema.findIndex((emp) => emp.e_id === pid);

    const std =  await studentSchema.findOneAndDelete({ s_id: pid },{rawResult: true})
  
    if(std.lastErrorObject.n === 1){
      resp.status(201).send("deleted");
    }else{
      resp.status(400).send("data not found which need to be deleted")
    }

    
  } catch (error) {
    resp.status(400).send(error);
  }
};
