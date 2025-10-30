<?php
include 'config.php';

$id = $_POST['id'];

$res = $conn->query("SELECT * FROM bikes WHERE id=$id");
if($res->num_rows > 0){
    $conn->query("DELETE FROM bikes WHERE id=$id");
    echo "Bike deleted successfully!";
} else {
    echo "Bike ID not found!";
}
?>
