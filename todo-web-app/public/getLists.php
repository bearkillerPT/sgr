<?php
require_once 'db.php';

$username = $data['username'];

// Retrieve the list of entries from the database
$sql = "SELECT * FROM lists WHERE username = '$username'";
$result = $conn->query($sql);

// Check if there are any rows returned
if ($result->num_rows > 0) {
    $entries = array();
    while ($row = $result->fetch_assoc()) {
        $entries[] = $row;
    }
    echo json_encode($entries);
} else {
    echo json_encode([]);
}

// Close the database connection
$conn->close();
?>
