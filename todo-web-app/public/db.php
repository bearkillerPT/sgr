<?php
$servername = "mysql-hosting.ua.pt";
$username = "deti-sgr-web";
$password = "zTj)40ZQ6cDB7YdO";
$dbname = "deti-sgr";

// Create a new mysqli object
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
