<?php require('./config.php');?>

<?php
error_reporting(E_ALL);
ini_set('display_error',1);
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Access-Control-Allow-Methods:*');
header('Access-Control-Allow-Origin:*');

$object = new crud;
$conn = $object->connect();


$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {

    case 'GET' :
        $sql = "SELECT * FROM `likes`" ;
        $query = $conn->prepare($sql);
        $query->execute();
        $likes = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($likes);
        break;


    case 'POST' :

        $likes = json_decode(file_get_contents('php://input'));
        print_r($likes);
        $sql = "INSERT INTO likes (user_id , post_id)
                VALUES (  ? , ? )" ;
        $query = $conn->prepare($sql);
        if($query->execute([$likes->user_id , $likes->post_id])){
            echo 'add success';
        };
        break;



    case 'DELETE' :
        $likes = json_decode(file_get_contents('php://input'));
        print_r($likes);
        // $sql = "DELETE FROM likes WHERE post_id = ? AND user_id = ?" ;
        // $query = $conn->prepare($sql);
        // $query->execute([$likes->user_id , $likes->post_id]);
        break;
}