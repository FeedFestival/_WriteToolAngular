<?php

    function _auth_authenticateDevice($id_device = "") {
        $r = "
        INSERT INTO client (
            id_device
        ) VALUES (
            ".sqlString($id_device)."
        )";

        return $r;
    }

    function _auth_getIdByDevice($id_device) {
        $r = "
        SELECT id 
        FROM client 
        WHERE id_device = ".sqlString($id_device)."
        ";

        return $r;
    }
?>