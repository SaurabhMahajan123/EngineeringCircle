const express = require("express");
const controllerModule = require("../Controllers/Courses");
const router = express.Router();


//courses router

router
.post("/courseCreate", controllerModule.courseCreate)
.get("/course/:id",  controllerModule.getCourse)
.get("/course",  controllerModule.getCourse)
.put("/courseUpdate/:id",controllerModule.courseUpdate)
.delete("/courseDelete/:id",controllerModule.courseDelete)

exports.router = router;