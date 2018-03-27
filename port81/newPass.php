<?php 

$err = "";
$custID = $date = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(!($_POST["customerID"])){
        $err = "Needs to be a customer";
    }
}


if (strlen($err) > 2){
  header('HTTP/1.1 400 UrABozo');
  echo $err;  
} else {
    $mysqli = new mysqli('localhost','root','Chegagg1o','it350');
    

    $date = $_POST["date"];
    $customerID = $_POST["customerID"];

    $dbinsert2 = "INSERT INTO day_pass (the_date, customerID) VALUES('$date', $customerID)";
    $newquery = $mysqli->query($dbinsert2);

    
    echo $newquery;
}
