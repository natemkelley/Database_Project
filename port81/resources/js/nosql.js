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

}
