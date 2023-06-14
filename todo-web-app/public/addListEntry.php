<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Assuming the list data is sent in the request body
    $data = json_decode(file_get_contents('php://input'), true);
    $listName = $data['list_name'];
    $username = $data['username'];
    $entry_text = $data['entry_text'];

    // Add a new entry to the list in the database
    $sql = "INSERT INTO listEntry (entry_text, completed,list_id) VALUES ('$entry_text', 'false',(SELECT list_id FROM lists WHERE list_name = '$listName' AND username = '$username'))";
}

// Close the database connection
$conn->close();
?>
