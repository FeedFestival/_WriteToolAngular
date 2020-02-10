<?php
    $credentialsRoot = ($dir."/Credentials/"."_".$a."_credentials.php");
    include($credentialsRoot);

    $conn = new mysqli($servername, $username, $password, $dbName);

    if (!$conn){
        die("Connection Failed. ". mysqli_connect_error());
    }

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header('P3P: CP="CAO PSA OUR"');
    header("Content-Type: application/json; charset=utf-8");
?>