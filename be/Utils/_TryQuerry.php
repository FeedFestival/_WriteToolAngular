<?php
function _TryQuerry($conn, $sql, $scope_identity = false) {

    mysqli_autocommit($conn, FALSE);
    $insert_id = 0;
    $r = mysqli_query($conn, $sql);
    $insert_id = $conn->insert_id;
    mysqli_commit($conn);

    if ($r) {
        if ($scope_identity) {
            return $insert_id;
        }
        return $r;
    } else {
        http_response_code(405);
        echo json_encode(
            array('Error' => "".$sql."
- Querry FAILED. ".mysqli_error($conn))
        );
        mysqli_rollback($conn);

        mysqli_close($conn);
        exit;
    }
}
?>
