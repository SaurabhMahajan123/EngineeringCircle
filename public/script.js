$(document).ready(function () {
  // date conversion function
  dateCoversion = (date) => {
    if (date === null) {
      let message = "NOT RELEASED YET";
      return message;
    } else {
      const dateObject = new Date(date);
      const year = dateObject.getFullYear();
      const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
      const day = dateObject.getDate().toString().padStart(2, "0");

      const formatedDate = `${year}-${month}-${day}`;
      return formatedDate;
    }
  };

  // random empid generator

  empid = () => {
    let randomNo = Math.floor(Math.random() * 900) + 100;
    let randomString = randomNo.toString();
    let finalId = "E" + randomString;
    return finalId;
  };

  stdid = () => {
    let randomNo = Math.floor(Math.random() * 900) + 100;
    let randomString = randomNo.toString();
    let finalId = "S" + randomString;
    return finalId;
  };

  $("#signInForm").on("submit", function (e) {
    e.preventDefault();
    console.log($("#signInForm").serialize());
    $.ajax({
      url: "/logIn",
      type: "post",
      data: $("#signInForm").serialize(),
      success: function (result) {
        if (result === "OK") {
          window.location.href = "/AdminHome";
        }
      },
      error: function (err) {
        alert(error.responseText);
      },
    });
  });

  $("#empMenu").hide();
  $("#studentMenu").hide();
  $("#centerMenu").hide();
  $("#courseMenu").hide();
  $("#update-modal").hide();

  $("#employeeSideMenu").on("click", function (e) {
    e.preventDefault();
    $("#empMenu").toggle();
  });

  $("#studentSideMenu").on("click", function (e) {
    e.preventDefault();
    $("#studentMenu").toggle();
  });

  $("#centerSideMenu").on("click", function (e) {
    e.preventDefault();
    $("#centerMenu").toggle();
  });

  $("#courseSideMenu").on("click", function (e) {
    e.preventDefault();
    $("#courseMenu").toggle();
  });

  // to hide search employee table
  $(".oneEmpTable").hide();

  // to reset search employee input box and hide employee table
  $("#empReset").on("click", function (e) {
    e.preventDefault();
    $(".oneEmpTable").hide();
    $(".empIdSearchForm")[0].reset();
  });



  // search employee

  $(".empIdSearchForm").on("submit", function (e) {
    e.preventDefault();

    let id = $(".empIdSearchForm").serialize().split("=")[1];

    $.ajax({
      url: "/employee/" + id,
      type: "get",
      success: function (result) {
        console.log(result);

        if (result === "Not Found") {
          alert("DATA NOT FOUND PLEASE CHECK ID");
        } else {
          doj = dateCoversion(result.e_doj);
          dor = dateCoversion(result.e_dor);
          $(".oneEmpTable").show();

          $("#oneEmpDetail").html(
            `<tr>
          <td class="table-dark text-light">Name</td>
          <td>${result.e_name}</td>
        </tr>
        <tr>
          <td class="table-dark text-light">Email</td>
          <td>${result.e_email}</td>
        </tr>
        <tr>
          <td class="table-dark text-light">Mobile No</td>
          <td>${result.e_mob_no}</td>
        </tr>
        <tr>
          <td class="table-dark text-light">Center Id</td>
          <td>${result.e_center_id}</td>
        </tr>
        <tr>
          <td class="table-dark text-light">Designation</td>
          <td>${result.e_designation}</td>
        </tr>
        <tr>
          <td class="table-dark text-light">Permanent Address</td>
          <td>${result.e_permanent_add}</td>
        </tr>
        <tr>
          <td class="table-dark text-light">Date of Joining</td>
          <td>` +
              doj +
              `</td>
        </tr>
        <tr>
          <td class="table-dark text-light">Date of Release</td>
          <td>` +
              dor +
              `</td>
        </tr>`
          );
        }
      },
      error: function (err) {
        alert(err.responseText);
        console.log(err.responseJSON);
      },
    });
  });

  //modal form on clicking update btn

  $("#empUpdateBtn").on("click", function (e) {
    e.preventDefault();
    let id = $("#employeeID").val();

    //  ajax req

    $.ajax({
      url: "/employee/" + id,
      type: "get",
      success: function (result) {
        let name = result.e_name;
        console.log(result.e_name);
        $("#update-form").html(
          `                                          
<div class="mb-3">
<label for="formGroupExampleInput" class="form-label">Employee Name</label>
<input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Your Name"  name="e_name" value= '${
            result.e_name
          }' required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Email</label>
<input type='text' class="form-control" placeholder='Enter Email id' id='email' name='e_email' value='${
            result.e_email
          }' required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Permanent Address</label>
<input type='text' class="form-control" placeholder='Enter Permanent Address' id='address' name='e_permanent_add' value='${
            result.e_permanent_add
          }' required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Designation</label>
<input type='text' class="form-control" placeholder='Enter Designation' id='designation' name='e_designation' value='${
            result.e_designation
          }'required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Center</label>
<input type='text' class="form-control" placeholder='Enter Center Id' id='center' name='e_center_id' value='${
            result.e_center_id
          }'required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Mobile no</label>
<input type='text' class="form-control" placeholder='Enter Mobile No' id='mobile' name='e_mob_no' value='${
            result.e_mob_no
          }' required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Date of Joining</label>
<input type='date' class="form-control"  id='doj' name='e_doj' value= ${dateCoversion(
            result.e_doj
          )} >
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Date of Release</label>
<input type='date' class="form-control" default="null" placeholder='DD-MM-YYYY' id='dor' name='e_dor' value='${dateCoversion(
            result.e_dor
          )}' >
</div>
<div class="text-center my-3">
<button type="submit" class="btn btn-primary w-25" id="updateSubmitBtn">Submit</button>
</div>`
        );

        $("#update-modal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });

  $("#update-form").on("submit", function (e) {
    e.preventDefault();
    let id = $("#employeeID").val();
    $.ajax({
      url: "/employeeUpdate/" + id,
      type: "put",
      data: $("#update-form").serialize(),
      success: function (result) {
        console.log(result);
        $("#update-modal").modal("hide");
        alert("Data Is Successfully Updated");
      },
      error: function (err) {
        alert(err.responseText);
      },
    });
  });

  $("#close").click((e) => {
    $("#update-modal").modal("hide");
  });

  $("#cancel-btn").click((e) => {
    $("#update-modal").modal("hide");
  });

  $("#empIdGenerator").click((e) => {
    e.preventDefault();

    let newId = empid();
    console.log(newId);
    $.ajax({
      type: "get",
      url: "/Allemployee",
      success: function (result) {
        let newId = empid();

        for (let i = 0; i < result.length; ++i) {
          let presentId = result[i].e_id;

          if (presentId === newId) {
            newId = empid();
            continue;
          } else {
            $("#generatedEmpId").val(newId);
            break;
          }
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });

  $(".addEmployeeForm").on("submit", function (e) {
    e.preventDefault();
    let id = $("#generatedEmpId").val();
    console.log(id);
    $.ajax({
      type: "post",
      url: "/employeeCreate",
      data: $(".addEmployeeForm").serialize(),
      success: function (result) {
        $(".addEmployeeForm")[0].reset();
        alert("New Employee Of Empid " + id + " Is Successfully Created");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });

  // to delete emp

  $("#empDeleteBtn").on("click", function (e) {
    e.preventDefault();
    let a = confirm("Data will be Permanently Deleted Carefull......");

    if (a == true){
      let idToDel = $(".empIdSearchForm").serialize().split("=")[1];

      $.ajax({
        type: "delete",
        url: "/employeeDelete/" + idToDel,
        success: function (result) {
          console.log(result);
          alert("Employee of empid " + idToDel + " is deleted");
          $("#empReset").click();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    }

  });


// students 



 // to hide search student table
 $(".oneStdTable").hide();

 // to reset search student input box and hide student table
 $("#stdReset").on("click", function (e) {
   e.preventDefault();
   $(".oneStdTable").hide();
   $(".stdIdSearchForm")[0].reset();
 });

 // search single student

 $(".stdIdSearchForm").on("submit", function (e) {
  e.preventDefault();

  let id = $(".stdIdSearchForm").serialize().split("=")[1];

  $.ajax({
    url: "/student/" + id,
    type: "get",
    success: function (result) {
   

      if (result === "Not Found") {
        alert("DATA NOT FOUND PLEASE CHECK ID");
      } else {
        dob = dateCoversion(result.s_dob);
        doa = dateCoversion(result.s_doa);
        dor = dateCoversion(result.s_dor);
        $(".oneStdTable").show();

        $("#oneStdDetail").html(
          `<tr>
        <td class="table-dark text-light">Name</td>
        <td>${result.s_name}</td>
      </tr>
      <tr>
        <td class="table-dark text-light">Email</td>
        <td>${result.s_email}</td>
      </tr>
      <tr>
        <td class="table-dark text-light">Mobile No</td>
        <td>${result.s_mob_no}</td>
      </tr>
      <tr>
        <td class="table-dark text-light">Center Id</td>
        <td>${result.s_center_id}</td>
      </tr>
      <tr>
        <td class="table-dark text-light">Address</td>
        <td>${result.s_address}</td>
      </tr>
    
      <tr>
        <td class="table-dark text-light">Course Id</td>
        <td>${result.s_course_id}</td>
      </tr>
      <tr>
        <td class="table-dark text-light">Date of Birth</td>
        <td>${dob}</td>
      </tr>
      <tr>
        <td class="table-dark text-light">Fees Paid</td>
        <td>${result.s_feepaid}</td>
      </tr>
      <tr>
        <td class="table-dark text-light">Date of Admission</td>
        <td>` +
            doa +
            `</td>
      </tr>
      <tr>
        <td class="table-dark text-light">Date of Release</td>
        <td>` +
            dor +
            `</td>
      </tr>`
        );
      }
    },
    error: function (err) {
      alert(err.responseText);
      console.log(err.responseJSON);
    },
  });
});


// student update form

$("#stdUpdateBtn").on("click", function (e) {
  e.preventDefault();
  let id = $("#studentID").val();

  //  ajax req

  $.ajax({
    url: "/student/" + id,
    type: "get",
    success: function (result) {
      let name = result.s_name;
      console.log(result.s_name);
      $("#student-update-form").html(
        `                                          
<div class="mb-3">
<label for="formGroupExampleInput" class="form-label">Employee Name</label>
<input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Your Name"  name="s_name" value= '${
          result.s_name
        }' required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Email</label>
<input type='text' class="form-control" placeholder='Enter Email id' id='email' name='s_email' value='${
          result.s_email
        }' required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Permanent Address</label>
<input type='text' class="form-control" placeholder='Enter Permanent Address' id='address' name='s_address' value='${
          result.s_address
        }' required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Course</label>
<input type='text' class="form-control" placeholder='Enter Course' id='courseId' name='s_course_id' value='${
          result.s_course_id
        }'required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Center</label>
<input type='text' class="form-control" placeholder='Enter Center Id' id='center' name='s_center_id' value='${
          result.s_center_id
        }'required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Mobile no</label>
<input type='text' class="form-control" placeholder='Enter Mobile No' id='mobile' name='s_mob_no' value='${
          result.s_mob_no
        }' required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Date of Joining</label>
<input type='date' class="form-control"  id='doa' name='s_doa' value= ${dateCoversion(
          result.s_doa
        )} >
</div>

<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Date of Birth</label>
<input type='date' class="form-control"  id='dob' name='s_dob' value= ${dateCoversion(
          result.s_dob
        )} >
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Date of Release</label>
<input type='date' class="form-control" default="null" placeholder='DD-MM-YYYY' id='dor' name='s_dor' value='${dateCoversion(
          result.s_dor
        )}' >
</div>
<div class="text-center my-3">
<button type="submit" class="btn btn-primary w-25" id="updateSubmitBtn">Submit</button>
</div>`
      );

      $("#update-modal").modal("show");
    },
    error: function (err) {
      console.log(err);
    },
  });
});

// post student update form

$("#student-update-form").on("submit", function (e) {
  e.preventDefault();
  let id = $("#studentID").val();
  $.ajax({
    url: "/studentUpdate/" + id,
    type: "put",
    data: $("#student-update-form").serialize(),
    success: function (result) {
      console.log(result);
      $("#update-modal").modal("hide");
      alert("Data Is Successfully Updated");
    },
    error: function (err) {
      alert(err.responseText);
    },
  });
});

// to delete student data

$("#stdDeleteBtn").on("click", function (e) {
  e.preventDefault();
  let a = confirm("Data will be Permanently Deleted Carefull......");

  if (a == true){
    let idToDel = $(".stdIdSearchForm").serialize().split("=")[1];

    $.ajax({
      type: "delete",
      url: "/studentDelete/" + idToDel,
      success: function (result) {
        console.log(result);
        alert("Student of id " + idToDel + " is deleted");
        $("#stdReset").click();
      },
      error: function (err) {
        console.log(err.responseText);
      },
    });
  }

});

// to add new student

$(".addStudentForm").on("submit", function (e) {
  e.preventDefault();
  let id = $("#generatedStdId").val();
  
  $.ajax({
    type: "post",
    url: "/studentCreate",
    data: $(".addStudentForm").serialize(),
    success: function (result) {
      console.log(result);
      $(".addStudentForm")[0].reset();
      alert("New Student Of id " + id + " Is Successfully Created");
    },
    error: function (err) {
      console.log(err);
    },
  });
});

// to generate random student id

$("#stdIdGenerator").click((e) => {
  e.preventDefault();

  let newId = stdid();
  console.log(newId);
  $.ajax({
    type: "get",
    url: "/Allstudent",
    success: function (result) {
      let newId = stdid();

      for (let i = 0; i < result.length; ++i) {
        let presentId = result[i].e_id;

        if (presentId === newId) {
          newId = stdid();
          i = -1
          continue;
        } else {
          $("#generatedStdId").val(newId);
          break;
        }
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
});

});
