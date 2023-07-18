<?php
header('Content-Type: application/json');
$host = 'localhost';
$db   = 'kai';
$user = 'kai';
$pass = 'dbpassword';
$charset = 'utf8mb4';

$dsn = "pgsql:host=$host;port=5432;dbname=$db;user=$user;password=$pass";
try {
    // create a PostgreSQL database connection
    $conn = new PDO($dsn);

    // display a message if connected to the PostgreSQL successfully
    if ($conn) {
        // echo "Connected to the <strong>$db</strong> database successfully!";
    }
} catch (PDOException $e) {
    // report error message
    echo $e->getMessage();
}

$tag = $_POST['tag'];

// Delete player tag from database
$query = 'DELETE FROM player_info WHERE tag = ?';
$stmt = $conn->prepare($query);
$stmt->execute([$tag]);

// Check if the row was deleted
if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
