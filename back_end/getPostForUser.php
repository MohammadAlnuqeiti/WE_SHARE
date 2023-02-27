<?php require('./config.php');?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");

$object = new crud;
$conn = $object->connect();



$method = $_SERVER['REQUEST_METHOD'];




        $path = explode('/',$_SERVER['REQUEST_URI']);
        $sql = "SELECT * FROM `users`
                INNER JOIN `posts` ON posts.user_id = users.id
                WHERE user_id = ? AND group_id = ?
                ORDER BY posts.created_at DESC " ;
        // print_r($path[4]);break;
        $query = $conn->prepare($sql);
        // $stmt->bindParam(':group_id', $path[4]);
        $query->execute([$path[4],0]);
        $posts = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($posts);