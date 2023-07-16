const express = require("express");
const controllerModule = require("../Controllers/Student");
const router = express.Router();


//employee router

router
.post("/studentCreate", controllerModule.studentCreate)
.get("/student/:id",  controllerModule.getStudent)
.get("/student",  controllerModule.getStudent)
.put("/studentUpdate/:id",controllerModule.studentUpdate)
.delete("/studentDelete/:id",controllerModule.studentDelete)

exports.router = router;