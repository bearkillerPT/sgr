<?php
require_once 'db.php';

// Read the request body
$data = json_decode(file_get_contents('php://input'), true);

// Extract the username and password from the request
$username = $data['username'];
$password = $data['password'];

// Query the database to check if the user exists
$query = "SELECT * FROM Users WHERE username = '$username'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
  // User found
  $row = $result->fetch_assoc();
  if (password_verify($password, $row['password'])) {
    // Password matches, login successful
    $response = array('success' => true, 'message' => 'Login successful');
    echo json_encode($response);
  } else {
    // Password does not match
    $response = array('success' => false, 'message' => 'Invalid username or password');
    echo json_encode($response);
  }
} else {
  // User not found
  $response = array('success' => false, 'message' => 'Invalid username or password');
  echo json_encode($response);
}

// Close the connection
$conn->close();
?>
