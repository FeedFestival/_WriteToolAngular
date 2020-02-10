<?php
    $a = "error"; if (array_key_exists("a", $_REQUEST)) { $a = strtoupper($_REQUEST["a"]); $r = '/^\{?[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}\}?$/'; if (preg_match($r, $a)) { $a = ""; } }
    $dir = $_SERVER['DOCUMENT_ROOT']."/".$a."/be";
    include($dir."/_connect.php");
	include($dir."/Utils/_TryQuerry.php");
    include($dir."/Utils/_sqlUtils.php");   // _elements.php
    include($dir."/StoryService/_story.php");

    $userId = intval($_REQUEST["userId"]);
    $arr = array();

    $sql = _story_getAll($userId);
    $result = _TryQuerry($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
		}
    }
	echo $json_response = json_encode($arr);
?>