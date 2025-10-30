<?php
include 'config.php';

$model = $_POST['model'];
$quantity = $_POST['quantity'];

$stmt = $conn->prepare("INSERT INTO bikes (model_name, quantity) VALUES (?, ?)");
$stmt->bind_param("si", $model, $quantity);
$stmt->execute();

echo "New bike model added successfully!";
?>
