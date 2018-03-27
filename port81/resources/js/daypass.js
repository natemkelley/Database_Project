function submitPass() {
    var date = $("#date").val();
    var custNum = getCustomerID($("#thecustomers").val());



    var dataString = "date=" + date + "&"
    dataString = dataString + "customerID=" + custNum;


    console.log(dataString);

    $.ajax({
        type: "POST",
        url: "newPass.php",
        data: dataString,
        cache: false,
        success: function (result) {
            displaySuccess(result);
        },
        error: function (jqXHR, execption) {
            ajaxError(jqXHR, execption);
        }
    });

};


$(document).ready(function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    //alert(today);

    $("#date").val(today);
});
