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


    
    
    //$dbinsert2 = "INSERT INTO customer (personID, classes,news_letter,vertical_feet_skied,lifts_ridden,days_at_resort) VALUES($result2,'$classes', $newsletter,0,0,1)";
    //$newquery = $mysqli->query($dbinsert2);

    
    //echo $result2;

}
