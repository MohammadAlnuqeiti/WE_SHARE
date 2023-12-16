<?php



class crud{

    public static function connect(){
        try{

        $con=new PDO('mysql:localhost=localhost;port=3308;dbname=react_platform_project','root','');

       
        return $con;

    }catch(PDOException $error){

        echo 'the error ' . $error->getMessage();


    }

    
   
        
    }
}