<!DOCTYPE html>
<html>

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"></script>
    <script>
        var config = {
            apiKey: "AIzaSyC_l58MrjoLbVAycctuwrjSbTToFhdBRlc",
            authDomain: "it350-cc5f6.firebaseapp.com",
            databaseURL: "https://it350-cc5f6.firebaseio.com",
            projectId: "it350-cc5f6",
            storageBucket: "it350-cc5f6.appspot.com",
            messagingSenderId: "237078450393"
        };
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(function(user) {
            console.log(user);
            $('body').fadeIn();
        });

    </script>


    <title>POS Page</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <link rel="stylesheet" href="resources/css/style.css">
</head>


<body>
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center">
                <h1>POS Panel</h1>
                <h3>Welcome to the Ski Resort</h3>
                <h4><a>This panel is intended to be used by cashiers of the resort</a></h4>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <h2 class="text-center" data-toggle="collapse" data-target="#customerPanel">Add Customer</h2>
        </div>
        <div class="collapse " id="customerPanel">
            <div class="customerPanel col-md-10 col-md-offset-1">
                <div class="form-group">
                    <label>First Name:</label>
                    <input required type="text" class="form-control" id="fname">
                </div>
                <div class="form-group">
                    <label>Last Name:</label>
                    <input required type="text" class="form-control" id="lname">
                </div>
                <div class="form-group">
                    <label>Middle Name:</label>
                    <input type="text" class="form-control" id="mname">
                </div>
                <div class="form-group">
                    <label>Email :</label>
                    <input type="text" class="form-control" id="email">
                </div>
                <div class="form-group">
                    <label>Address:</label>
                    <input type="text" class="form-control" id="address">
                </div>
                <div class="form-group">
                    <label>City:</label>
                    <input type="text" class="form-control" id="city">
                </div>
                <div class="form-group">
                    <label>State:</label>
                    <input type="text" class="form-control" id="state">
                </div>
                <div class="form-group">
                    <label>Zip:</label>
                    <input type="text" class="form-control" id="zip">
                </div>
                <div class="form-group">
                    <label>Phone:</label>
                    <input type="text" class="form-control" id="phone">
                </div>

                <div class="form-group">
                    <label>Classes:</label>
                    <input type="text" class="form-control" id="classes">
                </div>
                <div class="form-group">
                    <p>Do you want a news letter?</p>
                    <select class="form-control" id="newsletter">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-default btn-admin" onclick="submitCust()">Submit</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <h2 class="text-center" data-toggle="collapse" data-target="#ccPanel">Add Credit Card</h2>
        </div>
        <div class="collapse" id="ccPanel">
            <form class="creditcardPanel col-md-10 col-md-offset-1">
                <div class="form-group">
                    <p>Customer</p>
                    <select class="form-control" id="customerlist"></select>
                </div>
                <div class="form-group">
                    <label>Credit Card Number:</label>
                    <input required type="text" class="form-control" id="ccnumber">
                </div>
                <div class="form-group">
                    <p>Card Verified?</p>
                    <select class="form-control" id="cardverified">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                <div class="form-group">
                    <div type="submit" class="btn btn-default btn-admin" onclick="submitCard()">Submit</div>
                </div>
            </form>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <h2 class="text-center" data-toggle="collapse" data-target="#daypassPanel">Add Day Pass</h2>
        </div>
        <div class="collapse" id="daypassPanel">
            <div class="daypassPanel col-md-10 col-md-offset-1">
                <div class="form-group">
                    <label>Date:</label>
                    <input required type="date" class="form-control" id="date">
                </div>
                <div class="form-group">
                    <label>Customer:</label>
                    <select class="form-control" id="thecustomers">
                    </select>
                </div>
                <div type="submit" class="btn btn-default btn-admin" onclick="submitPass()">Submit</div>

            </div>
        </div>
    </div>


</body>


<script src="resources/js/pos.js"></script>
<script src="resources/js/getcust.js"></script>
<script src="resources/js/daypass.js"></script>

</html>
