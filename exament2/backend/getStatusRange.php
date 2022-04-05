<?php
include "connect.php";

try {
    $conn = new PDO("mysql:host=$serverName;dbname=$dataBase", $userName, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = 'SELECT reg_date, status FROM statusRange ORDER BY reg_date DESC LIMIT 1';

    foreach ($conn->query($sql) as $row) {
        echo $row['status'];
    }

    $conn->exec($sql);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

$conn = null;