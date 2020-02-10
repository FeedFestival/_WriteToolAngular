<?php
	$dir = $_SERVER['DOCUMENT_ROOT']."/be";
	include($dir."/_connect.php");
	include($dir."/Utils/_TryQuerry.php");
	include($dir."/Utils/_sqlUtils.php");
	include($dir."/UserService/_client.php");
	include($dir."/UserService/_fillClient.php");
	

	$id = $_REQUEST["id"];

	$client = new stdClass();

	$result = _TryQuerry($conn, _client_getClient($id));
	if (mysqli_num_rows($result) > 0) {
		while($row = $result->fetch_assoc()) {
			$client = _fillClient($row);
		}
	}

	if (empty((array)$client)) {
		echo null;
	} else {
		echo $json_response = json_encode($client);
	}
?>