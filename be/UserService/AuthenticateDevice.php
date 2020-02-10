<?php

    $dir = $_SERVER['DOCUMENT_ROOT']."/be";
	include($dir."/_connect.php");
	include($dir."/Utils/_getId.php");
    include($dir."/Utils/_TryQuerry.php");
	include($dir."/Utils/_sqlUtils.php");
	include($dir."/Utils/_isNullOrEmpty.php");
    include($dir."/UserService/_auth.php");

	//example: 2848b212cd593c31b3628b17d21d0fdcd5a8b2e9
    $id_device = $_REQUEST["id_device"];

	$id = _getId(_TryQuerry($conn, _auth_getIdByDevice($id_device)));

	if ($id == null && $id <= 0) {
		$id = _TryQuerry($conn, _auth_authenticateDevice($id_device), true);
	}

	$client = array(
		'id' => $id
	);
	echo $json_response = json_encode($client);
?>