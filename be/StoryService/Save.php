<?php
    $a = "error"; if (array_key_exists("a", $_REQUEST)) { $a = strtoupper($_REQUEST["a"]); $r = '/^\{?[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}\}?$/'; if (preg_match($r, $a)) { $a = ""; } }
    $dir = $_SERVER['DOCUMENT_ROOT'].($a != "" ? "/".$a : "")."/be";
    include($dir."/_connect.php");
	include($dir."/Utils/_TryQuerry.php");
    include($dir."/Utils/_sqlUtils.php");   // _elements.php
    include($dir."/StoryService/_story.php");

    $postdata = file_get_contents("php://input");
    $data = json_decode($postdata, true);

    $id_story = 0;
    if (array_key_exists('id', $data)) {
        $sql = _story_update($data);
        _TryQuerry($conn, $sql);
        $id_story = $data['id'];
    } else {
        $sql = _story_create($data);
        $id_story = _TryQuerry($conn, $sql, true);
    }
    echo($id_story);
?>