console.log('loading pos');


function submitCust() {
    //alert('pressed');

    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var mname = $("#mname").val();
    var email = $("#email").val();
    var address = $("#address").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var state = $("#zip").val();
    var state = $("#phone").val();
    var classes = $("#classes").val();
    var newsletter = $("#newsletter").val();

    var dataString = "";

    $('.customerPanel input').each(function () {
        if (dataString.length < 2) {
            console.log(this.value);
            console.log(this.id);
            dataString = this.id + '=' + this.value;
        } else {
            dataString = dataString + "&" + this.id + '=' + this.value;
        }
    });

    dataString = dataString + "&newsletter=" + newsletter;


    console.log(dataString);

    if (false) {
        //alert("Please Fill All Fields");
    } else {
        // AJAX Code To Submit Form.
        $.ajax({
            type: "POST",
            url: "newCustomer.php",
            data: dataString,
            cache: false,
            success: function (result) {
                displaySuccess(result)
            },
            error: function (jqXHR, execption) {
                ajaxError(jqXHR, execption)
            }
        });
    }
};



function displaySuccess(data) {
    //var jsonParse = JSON.parse(data);
    if (data == 1) {
        alert("IT WORKED");
    }
    //console.log(jsonParse);

}

function ajaxError(jqXHR, execption) {
    console.warn(jqXHR);
    console.warn(jqXHR.responseText);
    alert(jqXHR.responseText)
}
