<?php
include 'config.php';

$id = $_POST['id'];
$quantity = $_POST['quantity'];

$res = $conn->query("SELECT * FROM bikes WHERE id=$id");
if($res->num_rows > 0){
    $conn->query("UPDATE bikes SET quantity=$quantity WHERE id=$id");
    echo "Stock updated successfully!";
} else {
    echo "Bike ID not found!";
}
?>
