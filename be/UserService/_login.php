<?php

    function _getClientDevice($id){
        $r = "
        SELECT 
            id_device
        FROM client 
        WHERE
            (email IS NULL OR EMAIL = '')
            AND id = ".sqlNr($id)."
        ";
        // AND id_device = NULL
        return $r;
    }

    function _getClientByCredentials($email, $password){
        $r = "
        SELECT id
        FROM client 
        WHERE
            email = ".sqlString($email)."
            AND password = ".sqlString($password)."
        ";
        // AND id_device = NULL
        return $r;
    }
    
?>