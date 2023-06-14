<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Assuming the list data is sent in the request body
    $data = json_decode(file_get_contents('php://input'), true);
    $listName = $data['list_name'];
    $username = $data['username'];

    // Add a new list to the database
    $sql = "INSERT INTO lists (list_name, username) VALUES ('$listName', '$username')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('success' => true, 'message' => 'List added successfully'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Error adding list'));
    }
}

// Close the database connection
$conn->close();
?>
