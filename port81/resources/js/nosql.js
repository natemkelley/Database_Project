var database = firebase.database();



function writeUserData(name, email, imageUrl) {
    var d = new Date().getTime();


    firebase.database().ref('users/' + d).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}


function getNOSQL() {
    firebase.database().ref('users/').once('value').then(function (snapshot) {
        console.log(snapshot.val());
        var snap = snapshot.val();
        var myJSON = JSON.stringify(snap);
        document.getElementById("nosql").innerHTML = myJSON;
    });
}

function submitNOSQL() {
    console.log("submitted")
    var name = $("#nosqlname").val() || "Jack Daniels";
    var email = $("#nosqlemail").val() || "none@none.com";
    var imageUrl = $("#nosqluserimg").val() || "http://static.adweek.com/adweek.com-prod/wp-content/uploads/2017/09/skeletor-geico-hed-2017.jpg";

    var d = new Date().getTime();

    firebase.database().ref('users/' + d).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });

    alert("refresh page to see updates");
    $("#nosqlname").val("");
    $("#nosqlemail").val("");
    $("#nosqluserimg").val("");
}
