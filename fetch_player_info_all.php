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
        //echo "Connected to the <strong>$db</strong> database successfully!";
    }
} catch (PDOException $e) {
    // report error message
    echo $e->getMessage();
}

$query = 'SELECT * FROM player_info';
$stmt = $conn->prepare($query);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);
?>
