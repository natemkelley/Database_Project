var THE_CUSTOMERS = [];

function submitCard() {
    var ccnumber = $("#ccnumber").val();
    var verified = $("#cardverified").val();
    var custNum = getCustomerID($("#customerlist").val());


    var dataString = "ccnumber=" + ccnumber + "&"
    dataString = dataString + "verified=" + verified + "&";
    dataString = dataString + "customerID=" + custNum;


    console.log(dataString);

    if (false) {
        //alert("Please Fill All Fields");
    } else {
        // AJAX Code To Submit Form.
        $.ajax({
            type: "POST",
            url: "newCard.php",
            data: dataString,
            cache: false,
            success: function (result) {
                displaySuccess(result);
            },
            error: function (jqXHR, execption) {
                ajaxError(jqXHR, execption);
            }
        });
    }
};

$(document).ready(function () {
    $.getJSON('http://localhost:81/getCustomers.php', function (data) {
        //console.log(data);
        $.each(data, function (index, value) {
            var createName = data[index].custName;

            THE_CUSTOMERS.push(data[index]);
            $('#customerlist').append("<option>" + createName + "</option>");
            $('#thecustomers').append("<option>" + createName + "</option>");

        });
    });

});

function getCustomerID(data) {
    var customerID = 1;
    $.each(THE_CUSTOMERS, function (index, value) {
        //console.log(data.toString() + " " + value.custName);
        if ((value.custName) == data) {
            customerID = value.customerID;
        }
    })
    console.log(customerID);
    return customerID;
}
