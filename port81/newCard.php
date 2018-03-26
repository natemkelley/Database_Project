<?php 

$err = "";
$name = $email = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(!ctype_digit ($_POST["ccnumber"])){
        $err = "Needs to be a number";
    }
}


if (strlen($err) > 2){
  header('HTTP/1.1 400 UrABozo');
  echo $err;  
} else {
    $mysqli = new mysqli('localhost','root','Chegagg1o','it350');
    

    $ccnumber = $_POST["ccnumber"];
    $verified = $_POST["verified"];
    $customerID = $_POST["customerID"];

    
    $dbinsert2 = "INSERT INTO credit_card_info (card_number, verified, customerID) VALUES($ccnumber,$verified, $customerID)";
    $newquery = $mysqli->query($dbinsert2);

    
    echo "swag";
}
