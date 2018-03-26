var THE_CUSTOMERS = [];


$(document).ready(function () {
    $.getJSON('http://localhost:81/getCustomers.php', function (data) {
        //console.log(data);
        $.each(data, function (index, value) {
            var createName = data[index].custName;

            //console.log(value);
            THE_CUSTOMERS.push(data[index]);
            $('#customerlist').append("<option>" + createName + "</option>");
        });
    });
});

function getCustomerID(data) {
    console.log('WORKING!!!!')
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
