<?php

    $dbquery = "SELECT customer.customerID, person.personID, CONCAT(person.fName,' ',person.lName) AS custName FROM customer,person WHERE customer.personID = person.personID;";
   

    $mysqli = new mysqli('localhost','root','Chegagg1o','it350');

    //$dbquery = "SELECT * from customer;";


    $resultquery = $mysqli->query($dbquery);

    $rows = array();
    while($r = mysqli_fetch_assoc($resultquery)) {
        $rows[] = $r;
    }
    $result = json_encode($rows);

    echo $result;
