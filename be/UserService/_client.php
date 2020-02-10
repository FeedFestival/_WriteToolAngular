<?php

    function _client_getClient($id){
        $r = "
        SELECT 
            id,
            id_device,
            email,
            password,
            salt,
            lastname,
            firstname,
            phone,
            address1,
            address2,
            city,
            county
        FROM client 
        WHERE 1 = 1
            AND email IS NOT NULL AND email != ''
            AND id = ".sqlNr($id)."
        ";
        // AND id_device = NULL
        return $r;
    }

    function _registerClient($client){
        $r = "
        UPDATE client SET
            email = ".sqlString($client['email']).",
            password = ".sqlString($client['password']).",
            salt = '',
            lastname = ".sqlString($client['lastname']).",
            firstname = ".sqlString($client['firstname']).",
            phone = ".sqlString($client['phone']).",
            address1 = ".sqlString($client['address1']).",
            address2 = ".sqlString($client['address2']).",
            city = ".sqlString($client['city']).",
            county = ".sqlString($client['county'])."
        WHERE id = ".sqlNr($client['id'])."
        ";
        return $r;
    }
?>