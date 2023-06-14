require_once 'db.php';

// Read the request body
$data = json_decode(file_get_contents('php://input'), true);

// Extract the username and list_name from the request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $data['username'];
$list_name = $data['list_name'];

// Get the entries from the database
$sql = "SELECT * FROM listEntry WHERE list_id = (SELECT list_id FROM lists WHERE list_name = '$list_name' AND username = '$username')";
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

}
?>
