$(document).ready(function () {
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
    dateCoversion = (date)=>{

      if(date ===null){
        let message = "NOT RELEASED YET"
        return message;
      }else{
        const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");

    const formatedDate = `${day}-${month}-${year}`
    return formatedDate
      }
      
    }
    
    let id = $(".empIdSearchForm").serialize().split("=")[1];
 
    $.ajax({
      url: "/employee/" + id,
      type: "get",
      success: function (result) {
        doj =   dateCoversion(result.e_doj);
        dor = dateCoversion(result.e_dor)
        $(".oneEmpTable").show();
       console.log(result);
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
});
