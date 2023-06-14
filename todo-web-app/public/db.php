<?php
$servername = "mysql-hosting.ua.pt";
$username = "deti-sgr-dbo";
$password = "A6joF[(cKZAFt9ot";
$dbname = "deti-sgr";

// Create a new mysqli object
$conn = new mysqli($servername, $username, $password, $dbname);
// Check the connection
if ($conn->connect_error) {
    die("Connection failed: php" . $conn->connect_error);
}
?>
