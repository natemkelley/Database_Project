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
        },
        error: function (jqXHR, execption) {
            alert(jqXHR.responseText);
            $('.btn-mysql').addClass('btn-danger').fadeIn();
        }
    });
}

$(document).ready(function () {
    console.log("ready!");
    setFirebaseUI();
    nosqlStatus();
    MySqlStatus();
});
