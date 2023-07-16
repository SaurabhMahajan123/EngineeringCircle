const model = require("../model/Schema/Admin");
const adminSchema = model.adminSchema;



// for login 

exports.AdminLogIn = async (req, resp) => {
   
    if (req.body == null) {
      
      resp.status(400).send("Bad Request");
    } else if (req.body != null) {
      
      const data = await adminSchema.findOne({admin_pass : { $eq: req.body.pass } });
      
      if (data == null) {
        
        resp.status(404).send(" User Not Found");
      } else {
      
       resp.send(200)
      }
    }
  };




// for signUp

exports.adminCreate = async (req, resp) => {
    const admin = new adminSchema(req.body);
  
    try {
      await admin.save();
  
      resp.status(201).send("Created");
    } catch (e) {
      resp.status(400).send(e);
    }
  };

  // update existing admin
exports.adminUpdate = async (req, resp) => {
    const pid = req.params.id;
  
    try {
      const a = await adminSchema.findOneAndUpdate({ admin_id: pid }, req.body, {
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
exports.adminDelete = async (req, resp) => {
    const pid = req.params.id;
  
    try {
      //const empIndex = empSchema.findIndex((emp) => emp.e_id === pid);
  
      const std =  await adminSchema.findOneAndDelete({ admin_id: pid },{rawResult: true})
    
      if(std.lastErrorObject.n === 1){
        resp.status(201).send("deleted");
      }else{
        resp.status(400).send("data not found which need to be deleted")
      }
  
      
    } catch (error) {
      resp.status(400).send(error);
    }
  };