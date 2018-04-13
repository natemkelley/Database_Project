firebase.auth().onAuthStateChanged(function (user) {
    console.log(user);
    if (user) {
        $('div').removeClass('hide');
        $('#firebaseui-auth-container').addClass('hide');
    } else {
        $('#firebaseui-auth-container').removeClass('hide');
    }
});


function nosqlStatus() {
    firebase.database().ref('/').once('value').then(function (snapshot) {
        console.log(snapshot.val());
        $('.btn-nosql').addClass('btn-success').fadeIn();
        $('.btn-nosql').html('Firebase NoSQL <br>Connection Success');
    });

}

function setFirebaseUI() {
    var uiConfig = {
        signInSuccessUrl: 'dba.html',
        signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
}

function MySqlStatus() {
    $.ajax({
        type: "GET",
        url: "mysqlStatus",
        cache: false,
        success: function (result) {
            console.log(result);
            $('.btn-mysql').addClass('btn-success').fadeIn();
            $('.btn-mysql').html('MySQL <br>Connection Success');
        },
        error: function (jqXHR, execption) {
            $('.btn-mysql').addClass('btn-danger').fadeIn();
            $('.btn-mysql').html('MySQL <br>Connection failed');
        }
    });
}

function elasticsearchStatus() {
    $.ajax({
        type: "GET",
        url: "elasticsearchStatus",
        cache: false,
        success: function (result) {
            console.log(result);
            $('.btn-elasticsearch').addClass('btn-success').fadeIn();
            $('.btn-elasticsearch').html('Elastic Search <br>Connection Success');
        },
        error: function (jqXHR, execption) {
            //alert(jqXHR.responseText);
            $('.btn-elasticsearch').addClass('btn-danger').fadeIn();
            $('.btn-elasticsearch').html('Elastic Search <br>Connection Failed');
        }
    });
}

function getListOfBackups() {
    $.ajax({
        type: "GET",
        url: "getListOfBackups",
        cache: false,
        success: function (result) {
            displayBackups(result);
        },
        error: function (jqXHR, execption) {
            console.log(jqXHR);
        }
    });
}

function displayBackups(data) {
    console.log(data);
    $.each(data, function (i, item) {
        console.log(i);
        console.log(item[0]);
        var string = i + "<tab>" + item[0].month + "/" + item[0].day + "/" + item[0].year;
        $('#backups-list').append("<li>" + string + "</li>")

    });
}

$(document).ready(function () {
    console.log("ready!");
    setFirebaseUI();
    nosqlStatus();
    MySqlStatus();
    elasticsearchStatus();
    getListOfBackups();
});
