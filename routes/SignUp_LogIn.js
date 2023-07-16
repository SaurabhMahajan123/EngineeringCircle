const express = require("express");
const controllerModule = require("../Controllers/Admin");
const router = express.Router();


router
.post("/logIn",controllerModule.AdminLogIn)
.post("/Sign_Up",controllerModule.adminCreate)
.put("/adminUpdate",controllerModule.adminUpdate)
.delete("/adminDelete",controllerModule.adminDelete)

exports.router = router;