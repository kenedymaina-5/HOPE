<?php
$servername = "localhost";
$username = "username"; // For MYSQL the predifined username is root
$password = "yourpassword"; // For MYSQL the predifined password is " "(blank)

// Create connection
$conn = new mysqli($servername, $username, $password);

 
// Check connection

 if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";

?>