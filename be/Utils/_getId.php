<?php

    function _getId($result, $beNumber = false){
        if (mysqli_num_rows($result) < 1) {
            return -1;
        } else {
            while($row = $result->fetch_assoc()) {
                if ($beNumber == true) {
                    return (int)$row['id'];
                } else {
                    return $row['id'];
                }
            }
        }
    }
?>