[33mcommit c258852f5d5879a489510682a078f1e4ac49b36b[m[33m ([m[1;36mHEAD -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m)[m
Author: saurabh mahajan <saurabhmahajan1997@gmail.com>
Date:   Mon Jul 17 23:45:41 2023 +0530

    searchUpdate employee page

[1mdiff --git a/Controllers/Employee.js b/Controllers/Employee.js[m
[1mindex b90d1b4..648a1eb 100644[m
[1m--- a/Controllers/Employee.js[m
[1m+++ b/Controllers/Employee.js[m
[36m@@ -42,6 +42,8 @@[m [mexports.employeeCreate = async (req, resp) => {[m
 exports.employeeUpdate = async (req, resp) => {[m
   const pid = req.params.id;[m
 [m
[32m+[m[32m  console.log(req.body);[m
[32m+[m
   try {[m
     const a = await empSchema.findOneAndUpdate({ e_id: pid }, req.body, {[m
       new: true,[m
[1mdiff --git a/public/script.js b/public/script.js[m
[1mindex ed8ce4d..5a1bba3 100644[m
[1m--- a/public/script.js[m
[1m+++ b/public/script.js[m
[36m@@ -1,4 +1,27 @@[m
 $(document).ready(function () {[m
[32m+[m
[32m+[m[32m// date conversion function[m
[32m+[m[32mdateCoversion = (date)=>{[m
[32m+[m
[32m+[m[32m  if(date ===null){[m
[32m+[m[32m    let message = "NOT RELEASED YET"[m
[32m+[m[32m    return message;[m
[32m+[m[32m  }else{[m
[32m+[m[32m    const dateObject = new Date(date);[m
[32m+[m[32mconst year = dateObject.getFullYear();[m
[32m+[m[32mconst month = (dateObject.getMonth() + 1).toString().padStart(2, "0");[m
[32m+[m[32mconst day = dateObject.getDate().toString().padStart(2, "0");[m
[32m+[m
[32m+[m[32mconst formatedDate = `${year}-${month}-${day}`[m
[32m+[m[32mreturn formatedDate[m
[32m+[m[32m  }[m
[32m+[m[41m  [m
[32m+[m[32m}[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m[41m  [m
   $("#signInForm").on("submit", function (e) {[m
     e.preventDefault();[m
     console.log($("#signInForm").serialize());[m
[36m@@ -21,6 +44,7 @@[m [m$(document).ready(function () {[m
   $("#studentMenu").hide();[m
   $("#centerMenu").hide();[m
   $("#courseMenu").hide();[m
[32m+[m[32m  $("#update-modal").hide();[m
 [m
   $("#employeeSideMenu").on("click", function (e) {[m
     e.preventDefault();[m
[36m@@ -56,22 +80,7 @@[m [m$(document).ready(function () {[m
 [m
   $(".empIdSearchForm").on("submit", function (e) {[m
     e.preventDefault();[m
[31m-    dateCoversion = (date)=>{[m
[31m-[m
[31m-      if(date ===null){[m
[31m-        let message = "NOT RELEASED YET"[m
[31m-        return message;[m
[31m-      }else{[m
[31m-        const dateObject = new Date(date);[m
[31m-    const year = dateObject.getFullYear();[m
[31m-    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");[m
[31m-    const day = dateObject.getDate().toString().padStart(2, "0");[m
[31m-[m
[31m-    const formatedDate = `${day}-${month}-${year}`[m
[31m-    return formatedDate[m
[31m-      }[m
[31m-      [m
[31m-    }[m
[32m+[m[41m    [m
     [m
     let id = $(".empIdSearchForm").serialize().split("=")[1];[m
  [m
[36m@@ -82,7 +91,7 @@[m [m$(document).ready(function () {[m
         doj =   dateCoversion(result.e_doj);[m
         dor = dateCoversion(result.e_dor)[m
         $(".oneEmpTable").show();[m
[31m-       console.log(result);[m
[32m+[m[41m       [m
         $("#oneEmpDetail").html([m
         [m
           `<tr>[m
[36m@@ -131,4 +140,102 @@[m [m$(document).ready(function () {[m
       },[m
     });[m
   });[m
[32m+[m
[32m+[m[32m  //modal form on clicking update btn[m
[32m+[m
[32m+[m[32m    $("#empUpdateBtn").on("click",function(e){[m
[32m+[m[32m      e.preventDefault();[m
[32m+[m[32m     let id = $("#employeeID").val();[m
[32m+[m[41m      [m
[32m+[m[32m    //  ajax req[m
[32m+[m
[32m+[m[32m    $.ajax({[m
[32m+[m[32m      url: "/employee/" + id,[m
[32m+[m[32m      type: "get",[m
[32m+[m[32m      success: function(result){[m
[32m+[m[32m        let name = result.e_name;[m
[32m+[m[32m        console.log(result.e_name);[m
[32m+[m[32m        $("#update-form").html([m
[32m+[m
[32m+[m[32m`[m[41m                                          [m
[32m+[m[32m<div class="mb-3">[m
[32m+[m[32m<label for="formGroupExampleInput" class="form-label">Employee Name</label>[m
[32m+[m[32m<input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Your Name"  name="e_name" value= '${result.e_name}' required>[m
[32m+[m[32m</div>[m
[32m+[m[32m<div class="mb-3">[m
[32m+[m[32m<label for="formGroupExampleInput2" class="form-label">Email</label>[m
[32m+[m[32m<input type='text' class="form-control" placeholder='Enter Email id' id='email' name='e_email' value='${result.e_email}' required>[m
[32m+[m[32m</div>[m
[32m+[m[32m<div class="mb-3">[m
[32m+[m[32m<label for="formGroupExampleInput2" class="form-label">Permanent Address</label>[m
[32m+[m[32m<input type='text' class="form-control" placeholder='Enter Permanent Address' id='address' name='e_permanent_add' value='${result.e_permanent_add}' required>[m
[32m+[m[32m</div>[m
[32m+[m[32m<div class="mb-3">[m
[32m+[m[32m<label for="formGroupExampleInput2" class="form-label">Designation</label>[m
[32m+[m[32m<input type='text' class="form-control" placeholder='Enter Designation' id='designation' name='e_designation' value='${result.e_designation}'required>[m
[32m+[m[32m</div>[m
[32m+[m[32m<div class="mb-3">[m
[32m+[m[32m<label for="formGroupExampleInput2" class="form-label">Center</label>[m
[32m+[m[32m<input type='text' class="form-control" placeholder='Enter Center Id' id='center' name='e_center_id' value='${result.e_center_id}'required>[m
[32m+[m[32m</div>[m
[32m+[m[32m<div class="mb-3">[m
[32m+[m[32m<label for="formGroupExampleInput2" class="form-label">Mobile no</label>[m
[32m+[m[32m<input type='text' class="form-control" placeholder='Enter Mobile No' id='mobile' name='e_mob_no' value='${result.e_mob_no}' required>[m
[32m+[m[32m</div>[m
[32m+[m[32m<div class="mb-3">[m
[32m+[m[32m<label for="formGroupExampleInput2" class="form-label">Date of Joining</label>[m
[32m+[m[32m<input type='date' class="form-control"  id='doj' name='e_doj' value= ${dateCoversion(result.e_doj)} >[m
[32m+[m[32m</div>[m
[32m+[m[32m<div class="mb-3">[m
[32m+[m[32m<label for="formGroupExampleInput2" class="form-label">Date of Release</label>[m
[32m+[m[32m<input type='date' class="form-control" default="null" placeholder='DD-MM-YYYY' id='dor' name='e_dor' value='${dateCoversion(result.e_dor)}' >[m
[32m+[m[32m</div>[m
[32m+[m[32m<div class="text-center my-3">[m
[32m+[m[32m<button type="submit" class="btn btn-primary w-25" id="updateSubmitBtn">Submit</button>[m
[32m+[m[32m</div>`[m
[32m+[m[32m)[m
[32m+[m[41m           [m
[32m+[m[32m      $('#update-modal').modal('show');[m
[32m+[m[32m      },[m
[32m+[m[32m      error: function(err){[m
[32m+[m[32m        console.log(err);[m
[32m+[m[32m      }[m
[32m+[m[32m    })[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m[32m    })[m
[32m+[m
[32m+[m[32m    $("#update-form").on("submit",function(e){[m
[32m+[m[32m      e.preventDefault();[m
[32m+[m[32m      let id = $("#employeeID").val();[m
[32m+[m[32m      $.ajax({[m
[32m+[m[32m      url: "/employeeUpdate/" + id,[m
[32m+[m[32m      type: "put",[m
[32m+[m[32m      data: $("#update-form").serialize(),[m
[32m+[m[32m      success: function(result){[m
[32m+[m[32m        console.log(result);[m
[32m+[m[32m        $("#update-modal").modal('hide');[m
[32m+[m[32m        alert("Data Is Successfully Updated")[m
[32m+[m[32m      },[m
[32m+[m[32m      error: function(err){[m
[32m+[m[32m        alert(err.responseText)[m
[32m+[m[32m      }[m[41m [m
[32m+[m
[32m+[m[32m      })[m
[32m+[m
[32m+[m
[32m+[m[32m    })[m
[32m+[m
[32m+[m
[32m+[m[32m    $("#close").click((e)=>{[m
[32m+[m[32m      $("#update-modal").modal('hide')[m
[32m+[m[32m    })[m
[32m+[m
[32m+[m[32m    $("#cancel-btn").click((e)=>{[m
[32m+[m[32m      $("#update-modal").modal('hide')[m
[32m+[m[32m    })[m
[32m+[m
[32m+[m
[32m+[m
 });[m
[1mdiff --git a/views/SearchEmployee.ejs b/views/SearchEmployee.ejs[m
[1mindex 09fbcb8..1091bfd 100644[m
[1m--- a/views/SearchEmployee.ejs[m
[1m+++ b/views/SearchEmployee.ejs[m
[36m@@ -58,6 +58,45 @@[m
             </div>[m
            [m
           </div>[m
[32m+[m
[32m+[m
[32m+[m[32m           <!-- modal box -->[m
[32m+[m[32m          <div class="modal fade" id="update-modal">[m
[32m+[m
[32m+[m[32m            <div class="modal-dialog" role="document">[m
[32m+[m[41m    [m
[32m+[m[32m              <div class="modal-content">[m
[32m+[m[41m    [m
[32m+[m[32m                <div class="modal-header">[m
[32m+[m[32m                  <h5 class="modal-title" id="exampleModalLabel">Update form</h5>[m
[32m+[m[32m                  <button type="button" class="close"  id="cancel-btn" data-dismiss="modal" aria-label="Close">[m
[32m+[m[32m                    <span aria-hidden="true">&times;</span>[m
[32m+[m[32m                  </button>[m
[32m+[m[32m                </div>[m
[32m+[m[41m    [m
[32m+[m[32m                <div class="modal-body" id="update-box">[m
[32m+[m[41m                  [m
[32m+[m[32m                  <form class="form-control" id="update-form">[m
[32m+[m[41m    [m
[32m+[m[32m                  </form>[m
[32m+[m[41m                  [m
[32m+[m[41m                  [m
[32m+[m[32m                </div>[m
[32m+[m[41m    [m
[32m+[m[32m                <div class="container">[m
[32m+[m[32m                  <div class="row">[m
[32m+[m[41m           [m
[32m+[m[32m                      <button type="button" class="btn btn-danger  w-25 mx-auto mt-0 mb-3 " style="margin-top: 0%;" id="close" data-dismiss="modal">Close</button>[m
[32m+[m[41m         [m
[32m+[m[32m                  </div>[m
[32m+[m[32m                </div>[m
[32m+[m[41m              [m
[32m+[m[32m              </div>[m
[32m+[m[32m            </div>[m
[32m+[m[32m          </div>[m
[32m+[m
[32m+[m
[32m+[m
         </div>[m
       </div>[m
     </div>[m
