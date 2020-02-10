<?php

    include($dir."/Utils/_sqlUtils.php");

    function _user_getIdByFacebookId($facebook_id) {
        $r = "
        SELECT id 
        FROM user
        WHERE facebook_id = ".sqlNr($facebook_id).";
        ";
        return $r;
    }

    function _user_register($user) {
        $r = "
        INSERT INTO user (name, email, photoUrl, authToken, facebook_id) VALUES
        (".sqlString($user['name']).", ".sqlString($user['email']).", ".sqlString($user['photoUrl']).", ".sqlString($user['authToken']).", ".sqlNr($user['id']).");
        ";
        return $r;
    }
?>