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

$tag = $_GET['tag'];

// Fetch player info from Clash of Clans API
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.clashofclans.com/v1/players/%23' . urlencode($tag));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

$headers = array();
$headers[] = 'Accept: application/json';
$headers[] = 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjcyNGEzYjk3LTZkMTQtNDgzNi1iOGQ0LWEwMTk0MDY0OTYyOSIsImlhdCI6MTY4NzM3ODExNywic3ViIjoiZGV2ZWxvcGVyL2RlMmNjN2IxLTgwODQtNGNkNC1iNTQxLWE3NWM2MjNmMTYxNyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjMyLjE0Mi4yMDcuMjA2Il0sInR5cGUiOiJjbGllbnQifV19.wLCYVVKvSvWssuc0Qlxbc9-XqnUj4QllpNpSWJRpBJWBC0I-2CXrC1SSq_kmjUI1IzCExYVcDZp7A7DG-HbUkw';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close($ch);

$result_array = json_decode($result, true);

if (isset($result_array['reason'])) {
    echo json_encode($result_array);
} else {
    // Save player info in database
$query = 'INSERT INTO player_info (tag, name, level, trophies, clan_name, clan_level, role, attacks_won, defenses_won, donations, received_donations, war_stars, townhall_level)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
$stmt = $conn->prepare($query);
    try {
        $stmt->execute([
            $tag,
            $result_array['name'],
            $result_array['expLevel'],
            $result_array['trophies'],
            isset($result_array['clan']['name']) ? $result_array['clan']['name'] : null,
            isset($result_array['clan']['clanLevel']) ? $result_array['clan']['clanLevel'] : null,
            $result_array['role'] ?? null,
            $result_array['attackWins'],
            $result_array['defenseWins'],
            $result_array['donations'],
            $result_array['donationsReceived'],
            $result_array['warStars'],
            $result_array['townHallLevel'],
        ]);

        $result_array['clan_name'] = isset($result_array['clan']['name']) ? $result_array['clan']['name'] : null;
        $result_array['clan_level'] = isset($result_array['clan']['clanLevel']) ? $result_array['clan']['clanLevel'] : null;

        echo json_encode($result_array);
    } catch (PDOException $e) {
        if ($e->getCode() == 23505) {
            echo json_encode(['error' => 'Player info already exists.']);
        } else {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

}
?>
