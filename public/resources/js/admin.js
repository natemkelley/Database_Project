var THE_MANAGERS = [];
var THE_CUSTOMERS = [];

function getSelect() {
    var command = $('#getTable').val();
    var myurl = "/getResults?q=" + command;
    changeHeader(command);
    clearResults();

    $.getJSON(myurl, function (data) {
        console.log(data);
        displayResults(data, 'showData')
        $("#showData").fadeIn();
    });
}

function customSQL() {
    var command = $('#customSQL').val();
    console.log(command);

    var myurl = "/customSQL?q=" + command;
    clearResults();

    $.getJSON(myurl, function (data) {
        console.log(data);
        displayResults(data, 'showCustomSQL');
        $("#showCustomSQL").fadeIn();
    })

}

function clearResults() {
    $("#showData").hide();
    $("#showCustomSQL").hide();
    $('#customSQL').val('');
}

function changeHeader(command) {
    $('#resultsHeader').text(command);
}

function displayResults(data, datID) {
    if (data.errno) {
        console.log('freak');
        $('#' + datID).html("<h4 class='text-center' style='color:red; font-size:40px;'>INVALID QUERY</h4>");
        return;
    }


    var arrItems = []; // THE ARRAY TO STORE JSON ITEMS.
    $.each(data, function (index, value) {
        arrItems.push(value); // PUSH THE VALUES INSIDE THE ARRAY.
    });

    // EXTRACT VALUE FOR TABLE HEADER.
    var col = [];
    for (var i = 0; i < arrItems.length; i++) {
        for (var key in arrItems[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < arrItems.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);

            var datValue = arrItems[i][col[j]];
            if (datValue) {
                var id = datValue.toString();
                var lastfour = id.slice(-4); // => "Tabs1"
            } else {
                lastfour = "woozle";
            }


            if (lastfour === ('.gif' || '.jpg|' || '.png')) {
                arrItems[i][col[j]] = '<img src="' + id + '" alt="Mountain View">';
            }

            tabCell.innerHTML = arrItems[i][col[j]];
        }
    }

    //THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById(datID);
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function structuredadd() {
    var whatSelect = $('#whattoadd').val();

    switch (whatSelect) {
        case "personSelect":
            addPerson();
            break;
        case "-":
            alert('Select Something!');
            break;
        default:
            beforeSubmitToServer();
            break;
    }
}

function addPerson() {
    console.log('adding person');
    var whatTypePerson = $('#whatpersontoadd').val();

    switch (whatTypePerson) {
        case "customerSelect":
            beforeSubmitToServer();
            break;
        case "employeeSelect":
            beforeSubmitToServer();
            break;
        default:
            alert('Select Something!');
    }
}

function beforeSubmitToServer() {
    var jsonArray = {};
    var prepper = "";
    var emptyFields = false;

    $("#datinputform :input").each(function () {
        if (this.value.length < 1) {
            emptyFields = true;
        }

        if ((this.value)) {
            if ($(this).is(':visible')) {
                var datID = $(this).attr('id');


                if (datID == "themanagers") {
                    console.log(this.value);
                    var empID = getManagerEmpID(this.value);
                    console.log(empID);
                    jsonArray[datID] = empID;
                    return;
                }
                if ((datID == "customerlist") || (datID == "thecustomers")) {
                    console.log(this.value);
                    var empID = getCustomerID(this.value);
                    console.log(empID);
                    jsonArray[datID] = empID;
                    return;
                }
                jsonArray[datID] = this.value;
            }
        }
    });

    console.log(jsonArray);

    if (emptyFields) {
        if (confirm("Looks like you have empty fields. Sure you want to submit?")) {} else {
            alert("Crisis Averted");
            return;
        }
    }

    submitToServer(jsonArray);
}

function getManagerEmpID(data) {
    var employeeID = 1;
    $.each(THE_MANAGERS, function (index, value) {
        if (value.mname == data) {
            employeeID = value.employeeID;
        }
    })
    console.log(employeeID);
    return employeeID;
}

function getCustomerID(data) {
    console.log('WORKING!!!!')
    var customerID = 1;
    $.each(THE_CUSTOMERS, function (index, value) {
        if ((value.custName) == data) {
            customerID = value.customerID;
        }
    })
    console.log(customerID);
    return customerID;
}

function submitToServer(request) {
    $.ajax({
        type: "POST",
        url: "submitItem",
        data: JSON.stringify({
            Sending: request
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('#showStatus').html('<h1 class="text-center showstatus"">SEEMS TO HAVE WORKED</h1>')

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

$("#whattoadd").on("change", function () {
    var value = $(this).val();
    //console.log(value);
    $('.level2').hide();
    $('.level3').hide();
    $('.level4').hide();

    $("#" + value).fadeIn();
})

$("#whatpersontoadd").on("change", function () {
    var value = $(this).val();
    //console.log(value);
    $('.level3').hide();
    $("#" + value).fadeIn();
})

$("#typeofemp").on("change", function () {
    var value = $(this).val();
    //console.log(value);
    $('.level4').hide();
    console.log(value)
    $("#" + value).fadeIn();
})

$(document).ready(function () {
    $.getJSON('getManagers', function (data) {
        console.log(data);
        $.each(data, function (index, value) {
            THE_MANAGERS.push(data[index]);
            console.log(data[index].mname);
            $('#themanagers').append("<option>" + data[index].mname + "</option>");
        });
    });
    $.getJSON('getCustomers', function (data) {
        console.log(data);
        $.each(data, function (index, value) {
            var createName = data[index].custName;

            console.log(value);
            THE_CUSTOMERS.push(data[index]);
            $('#thecustomers').append("<option>" + createName + "</option>");
            $('#customerlist').append("<option>" + createName + "</option>");
        });
    });

});
