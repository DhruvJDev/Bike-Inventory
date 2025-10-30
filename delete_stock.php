<?php
include 'config.php';

$id = $_POST['id'];
$quantity = $_POST['quantity'];

// Get current quantity
$res = $conn->query("SELECT quantity FROM bikes WHERE id=$id");
if($res->num_rows > 0){
    $row = $res->fetch_assoc();
    $newQuantity = $row['quantity'] - $quantity;
    if($newQuantity < 0) $newQuantity = 0;
    $conn->query("UPDATE bikes SET quantity=$newQuantity WHERE id=$id");
    echo "Stock subtracted successfully!";
} else {
    echo "Bike ID not found!";
}
?>
