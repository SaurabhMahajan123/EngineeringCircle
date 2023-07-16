const express = require("express");
const controllerModule = require("../Controllers/Employee");
const router = express.Router();


//employee router

router
.post("/employeeCreate", controllerModule.employeeCreate)
.get("/employee/:id",  controllerModule.getEmployee)
.get("/employee",  controllerModule.getEmployee)
.put("/employeeUpdate/:id",controllerModule.employeeUpdate)
.delete("/employeeDelete/:id",controllerModule.employeeDelete)

exports.router = router;