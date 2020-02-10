<?php

    function _getImageName($fileName, $id_cart, $id_client) {

        return $id_cart."_".$id_client."_".basename($fileName);
    }

    function _saveImage($fileName, $the_file) {

        // basename() may prevent filesystem traversal attacks;
        $picture_location = "/uploads"."/".$fileName;
        $picture_server_location = $_SERVER['DOCUMENT_ROOT'].$picture_location;
        move_uploaded_file($the_file, $picture_server_location);
    }
?>