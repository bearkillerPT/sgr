<?php
require_once 'db.php';

var_dump($_POST);
// Read the request body
$data = json_decode(file_get_contents('php://input'), true);

// Extract the username and password from the request
$username = $data['username'];
$password = $data['password'];

// Check if the username already exists in the database
$query = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
  // Username already exists
  $response = array('success' => false, 'message' => 'Username already exists');
  echo json_encode($response);
} else {
  // Hash the password
  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  // Insert the new user into the database
  $insertQuery = "INSERT INTO users (username, password) VALUES ('$username', '$hashedPassword')";
  if ($conn->query($insertQuery) === true) {
    // Registration successful
    $response = array('success' => true, 'message' => 'Registration successful');
    echo json_encode($response);
  } else {
    // Registration failed
    $response = array('success' => false, 'message' => 'Registration failed');
    echo json_encode($response);
  }
}

// Close the connection
$conn->close();
?>
