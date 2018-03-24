<?php 

$err = "";
$name = $email = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["fname"])) {
    $err = "Name is required\n";
  } else {
    $name = test_input($_POST["fname"]);
    // check if name only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
      $err = "Only letters and white space allowed for name"; 
    }
  }

  if (empty($_POST["email"])) {
    $err = "Email is required\n";
  } else {
    $email = test_input($_POST["email"]);
    // check if e-mail address is well-formed
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $err = "Invalid email format"; 
    }
  }
}


if (strlen($err) > 2){
  header('HTTP/1.1 400 UrABozo');
  echo $err;  
} else {
    $mysqli = new mysqli('localhost','root','Chegagg1o','it350');
    
        
    if(empty($_POST['fname'])) {
        $fname = "-"; 
    } else{
        $fname = $_POST["fname"]; 
    }

    $lname = $_POST["lname"];
    $mname = $_POST["mname"];
    $email = $_POST["email"];
    $city = $_POST["city"];
    $state = $_POST["state"];
    $address = $_POST["address"];
    $zip = $_POST["zip"];
    $phone = $_POST["phone"];
    
    
    //$dbinsert = "INSERT INTO person (fName,lName,mName,city,state,address,zip,phone) VALUES ( '" + $fName + "', '" + $lName + "', '" + $mName + "', '" + $city + "', '" + $state + "', '" + $address + "', '" + $zip + "', '" + $phone + "'); ";
    
    $dbinsert = "INSERT INTO person (fname) VALUES ('Poopy');";
    $dbinsert2 = "";

    $result = $mysqli->query($dbinsert);
    $result2 = $mysqli->insert_id;

    echo $result2;

    
    //get personID
    //var dbinsert = "INSERT INTO customer (classes, news_letter,vertical_feet_skied,lifts_ridden,days_at_resort,personID) VALUES('" + classes + "', " + newsletter + ", " + 0 + ", " + 0 + ", " + 0 + ", " + personID + ")";

    
    
    //$result = $mysqli->query("SELECT * from customer");
    

    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    $result = json_encode($rows);

    
    
}







function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
