<?php
    $a = "error"; if (array_key_exists("a", $_REQUEST)) { $a = strtoupper($_REQUEST["a"]); $r = '/^\{?[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}\}?$/'; if (preg_match($r, $a)) { $a = ""; } }
    $dir = $_SERVER['DOCUMENT_ROOT']."/".$a."/be";
    include($dir."/_connect.php");
    include($dir."/Utils/_getId.php");
	include($dir."/Utils/_TryQuerry.php");
    include($dir."/UserService/_user.php");

    $postdata = file_get_contents("php://input");
    $data = json_decode($postdata, true);

    $id_user = 0;
    $sql = _user_getIdByFacebookId($data['id']);

    $id_user = _getId(_TryQuerry($conn, $sql), true);
    $exists = $id_user >= 0;
    if ($exists == true) {
        echo($id_user);
        return;
    } else {
        $sql = _user_register($data);
        $id_user = _TryQuerry($conn, $sql, true);
        echo($id_user);
    }
?>