$(document).ready(function () {
    $.getJSON('http://localhost:80/getCustomers', function (data) {
        console.log(data);
        $.each(data, function (index, value) {
            var createName = data[index].custName;

            console.log(value);
            THE_CUSTOMERS.push(data[index]);
            $('#customerlist').append("<option>" + createName + "</option>");
        });
    });
});
