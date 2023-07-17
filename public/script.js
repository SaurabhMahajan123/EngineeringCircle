$(document).ready(function () {

// date conversion function
dateCoversion = (date)=>{

  if(date ===null){
    let message = "NOT RELEASED YET"
    return message;
  }else{
    const dateObject = new Date(date);
const year = dateObject.getFullYear();
const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
const day = dateObject.getDate().toString().padStart(2, "0");

const formatedDate = `${year}-${month}-${day}`
return formatedDate
  }
  
}




  
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



  $(".oneEmpTable").hide();

  $("#empReset").on("click",function(e){
    e.preventDefault();
    $(".oneEmpTable").hide();
    $(".empIdSearchForm")[0].reset();
  })
  
  // search employee

  $(".empIdSearchForm").on("submit", function (e) {
    e.preventDefault();
    
    
    let id = $(".empIdSearchForm").serialize().split("=")[1];
 
    $.ajax({
      url: "/employee/" + id,
      type: "get",
      success: function (result) {
        doj =   dateCoversion(result.e_doj);
        dor = dateCoversion(result.e_dor)
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
          <td>`+doj+`</td>
        </tr>
        <tr>
          <td class="table-dark text-light">Date of Release</td>
          <td>`+dor+`</td>
        </tr>`
         





        );
      },
      error: function (err) {
        alert(err.responseText)
        console.log(err.responseJSON);
      },
    });
  });

  //modal form on clicking update btn

    $("#empUpdateBtn").on("click",function(e){
      e.preventDefault();
     let id = $("#employeeID").val();
      
    //  ajax req

    $.ajax({
      url: "/employee/" + id,
      type: "get",
      success: function(result){
        let name = result.e_name;
        console.log(result.e_name);
        $("#update-form").html(

`                                          
<div class="mb-3">
<label for="formGroupExampleInput" class="form-label">Employee Name</label>
<input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Your Name"  name="e_name" value= '${result.e_name}' required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Email</label>
<input type='text' class="form-control" placeholder='Enter Email id' id='email' name='e_email' value='${result.e_email}' required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Permanent Address</label>
<input type='text' class="form-control" placeholder='Enter Permanent Address' id='address' name='e_permanent_add' value='${result.e_permanent_add}' required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Designation</label>
<input type='text' class="form-control" placeholder='Enter Designation' id='designation' name='e_designation' value='${result.e_designation}'required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Center</label>
<input type='text' class="form-control" placeholder='Enter Center Id' id='center' name='e_center_id' value='${result.e_center_id}'required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Mobile no</label>
<input type='text' class="form-control" placeholder='Enter Mobile No' id='mobile' name='e_mob_no' value='${result.e_mob_no}' required>
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Date of Joining</label>
<input type='date' class="form-control"  id='doj' name='e_doj' value= ${dateCoversion(result.e_doj)} >
</div>
<div class="mb-3">
<label for="formGroupExampleInput2" class="form-label">Date of Release</label>
<input type='date' class="form-control" default="null" placeholder='DD-MM-YYYY' id='dor' name='e_dor' value='${dateCoversion(result.e_dor)}' >
</div>
<div class="text-center my-3">
<button type="submit" class="btn btn-primary w-25" id="updateSubmitBtn">Submit</button>
</div>`
)
           
      $('#update-modal').modal('show');
      },
      error: function(err){
        console.log(err);
      }
    })



    })

    $("#update-form").on("submit",function(e){
      e.preventDefault();
      let id = $("#employeeID").val();
      $.ajax({
      url: "/employeeUpdate/" + id,
      type: "put",
      data: $("#update-form").serialize(),
      success: function(result){
        console.log(result);
        $("#update-modal").modal('hide');
        alert("Data Is Successfully Updated")
      },
      error: function(err){
        alert(err.responseText)
      } 

      })


    })


    $("#close").click((e)=>{
      $("#update-modal").modal('hide')
    })

    $("#cancel-btn").click((e)=>{
      $("#update-modal").modal('hide')
    })



});
