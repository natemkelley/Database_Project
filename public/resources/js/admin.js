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

    /*
        $.post("/customSQL", {
                name: "Donald Duck",
                city: "Duckburg"
            },
            function (data, status) {
                alert("Data: " + data + "\nStatus: " + status);
            });
    */
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
            var id = datValue.toString();
            var lastfour = id.slice(-4); // => "Tabs1"
            console.log(lastfour);

            if (lastfour === ('.gif' || '.jpg|' || '.png')) {
                console.log(datValue);
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
    console.log(whatSelect);

    switch (whatSelect) {
        case "personSelect":
            addPerson();
            break;
        case "peakSelect":
            addPeak();
            break;
        case "liftSelect":
            addLift();
            break;
        case "creditcardSelect":
            addCreditCard();
            break;
        case "daypassSelect":
            addDayPass();
            break;
        case "runSelect":
            addRun();
            break;
        case "terrainparkSelect":
            addTerrainPark();
            break;
        case "mogulrunSelect":
            addMogulRun();
            break;
        default:
            alert('Select Something!');
    }
}

function addPerson() {
    console.log('adding person');
    var whatTypePerson = $('#whatpersontoadd').val();
    console.log(whatTypePerson);

    switch (whatTypePerson) {
        case "customerSelect":
            addCustomer();
            break;
        case "employeeSelect":
            addEmployee();
            break;
        default:
            alert('Select Something!');

    }
}

function addCustomer() {
    console.log('adding cust');
}

function addEmployee() {
    console.log('adding emp');
}

function addPeak() {
    console.log('adding peak');
}

function addLift() {
    console.log('adding lift');
}

function addDayPass() {
    console.log('adding dp');
}

function addCreditCard() {
    console.log('adding cc');
}

function addRun() {
    console.log('adding run');
}

function addTerrainPark() {
    console.log('adding terrain Park');
}

function addMogulRun() {
    console.log('adding terrain Park');
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

$("#typesofemp").on("change", function () {
    var value = $(this).val();
    //console.log(value);
    $('.level4').hide();
    $("#" + value).fadeIn();
})
