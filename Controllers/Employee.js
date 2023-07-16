const model = require("../model/Schema/Employee");
const empSchema = model.empSchema;
const center = require("../model/Schema/Centers");
const centerSchema = center.centerSchema;
const desig = require("../model/Schema/Designations");
const desigSchema = desig.designationSchema;

//get  employee
exports.getEmployee = async (req, resp) => {

  console.log(req.params.id);
  if (req.params.id == null) {
    const all = await empSchema.find();
    resp.status(200).render("AllEmployee",{all})
  } else if (req.params != null) {
    const data = await empSchema.findOne({ e_id: { $eq: req.params.id } });

    if (data === null) {
      resp.status(404).send("Not Found");
    } else {

      // resp.status(200).render("Searchemployee")
      resp.status(200).send(data);
    }
  }
};

// create new employee
exports.employeeCreate = async (req, resp) => {
  const employee = new empSchema(req.body);

  try {
    await employee.save();

    resp.status(201).send("Created");
  } catch (e) {
    resp.status(400).send(e);
  }
};

// update existing employee
exports.employeeUpdate = async (req, resp) => {
  const pid = req.params.id;

  try {
    const a = await empSchema.findOneAndUpdate({ e_id: pid }, req.body, {
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
exports.employeeDelete = async (req, resp) => {
  const pid = req.params.id;

  try {
    //const empIndex = empSchema.findIndex((emp) => emp.e_id === pid);

    const emp =  await empSchema.findOneAndDelete({ e_id: pid },{rawResult: true})
  
    if(emp.lastErrorObject.n === 1){
      resp.status(201).send("deleted");
    }else{
      resp.status(400).send("data not found which need to be deleted")
    }

    
  } catch (error) {
    resp.status(400).send(error);
  }
};
