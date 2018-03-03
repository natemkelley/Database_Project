function getSQL() {
    var command = $('#command').val();
    console.log(command);


    $.ajax({
        url: "/test",
        success: function (result) {
            console.log(result);
        }
    });
}
