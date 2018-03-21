console.log('loading pos');



function submitCust() {
    alert('pressed');

    var name = $("#fname").val();
    var email = $("#email").val();
    // Returns successful data submission message when the entered information is stored in database.



    var dataString = 'fname=' + name + '&email1=' + email;

    if (false) {
        alert("Please Fill All Fields");
    } else {
        // AJAX Code To Submit Form.
        $.ajax({
            type: "POST",
            url: "newCustomer.php",
            data: dataString,
            cache: false,
            success: function (result) {
                alert(result);
            }
        });
    }
};


function submitCustomer() {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("txtHint").innerHTML = this.responseText;
        }
    }
    xmlhttp.open("GET", "newCustomer.php?" + str, true);
    xmlhttp.send();

}
