<?php
    $a = "error"; if (array_key_exists("a", $_REQUEST)) { $a = strtoupper($_REQUEST["a"]); $r = '/^\{?[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}\}?$/'; if (preg_match($r, $a)) { $a = ""; } }
    $dir = $_SERVER['DOCUMENT_ROOT'].($a != "" ? "/".$a : "")."/be";
    include($dir."/_connect.php");
    include($dir."/Utils/_TryQuerry.php");
    include($dir."/Utils/_sqlUtils.php");   // _elements.php
    include($dir."/ElementService/_elements.php");

    $userId = intval($_REQUEST["userId"]);
    $storyId = intval($_REQUEST["storyId"]);
    $story = null;
    $sql = _elements_getAll($storyId, $userId);
    $result = _TryQuerry($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        while($row = $result->fetch_assoc()) {
            $story = $row;
		}
    }
	echo $json_response = json_encode($story);
?>