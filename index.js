  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
 const database = require('./model/connection');
  const path = require("path");
  const ejs = require("ejs");
  const session = require("express-session");
  const current_dirpath = path.join(__dirname);
  const empRouter = require("./routes/Employee")
  const studentRouter = require("./routes/Students")
  const courseRouter = require("./routes/Course");
  const adminRouter = require("./routes/SignUp_LogIn");
  const commonRouter = require("./routes/common")
  //to connect mongo db
  database.connect().catch(err => console.log(err));

  app.use(express.static('public/'));
  app.set("view engine", "ejs");
  app.use(bodyParser.urlencoded()); //  FOR FETCHING FORM DATA
  app.use(bodyParser.json());
  app.use("",adminRouter.router)
  app.use("",empRouter.router);
  app.use("",studentRouter.router);
  app.use("",courseRouter.router);
  app.use("",commonRouter.router)

app.get('/Courses',(req,resp)=>{
  resp.status(200).render('Courses');
})



app.listen("5500",()=>{
    console.log("server is started");
})
