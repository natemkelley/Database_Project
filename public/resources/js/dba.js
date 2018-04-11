console.log('dba');

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

firebase.auth().onAuthStateChanged(function (user) {
    console.log(user);
    if (user) {
        $('div').removeClass('hide');
        $('#firebaseui-auth-container').addClass('hide');
    } else {
        $('#firebaseui-auth-container').removeClass('hide');
    }
});

firebase.database().ref('/').once('value').then(function (snapshot) {
    console.log(snapshot.val());
    $('.btn-nosql').addClass('btn-success').fadeIn();
});
