const express = require("express");
const app = express();
const router = express.Router();

router
.get('/home',(req,resp)=>{
    resp.status(200).render('Home');
})
.get('/AdminHome',(req,resp)=>{
  resp.status(200).render('AdminHome');
})
.get('/EmployeePage',(req,resp)=>{
  resp.status(200).render('Employee');
})
.get('/loginPage',(req ,resp)=>{
    resp.status(200).render("Admin")
  })
  .get('/searchEmployee',(req ,resp)=>{
    resp.status(200).render("SearchEmployee")
  })
exports.router = router;