<?php
    $a = "error"; if (array_key_exists("a", $_REQUEST)) { $a = strtoupper($_REQUEST["a"]); $r = '/^\{?[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}\}?$/'; if (preg_match($r, $a)) { $a = ""; } }
    $dir = $_SERVER['DOCUMENT_ROOT'].($a != "" ? "/".$a : "")."/be";
    include($dir."/_connect.php");
    include($dir."/Utils/_getId.php");
    include($dir."/Utils/_TryQuerry.php");
    include($dir."/Utils/_sqlUtils.php");   // _elements.php, _story.php
    include($dir."/ElementService/_elements.php");
    include($dir."/StoryService/_story.php");

    $userId = intval($_REQUEST["userId"]);
    $storyId = intval($_REQUEST["storyId"]);

    $postdata = file_get_contents("php://input");
    $data = json_decode($postdata, true);

    // 1. Check if the user has access to the story
    $sql = _story_getByIds($storyId, $userId);
    $story_exists = _getId(_TryQuerry($conn, $sql), true) >= 0;
    if ($story_exists == true) {

        $sql = _elements_getByStoryId($storyId);
        $elements_id = _getId(_TryQuerry($conn, $sql), true);
        $elements_exists = $elements_id >= 0;

        if ($elements_exists == true) {
            $sql = _elements_update($data['json'], $storyId, $elements_id);
            // var_dump($sql);
            // return;
            _TryQuerry($conn, $sql);
            echo("Updated");
        } else {
            $sql = _elements_create($data['json'], $storyId);
            _TryQuerry($conn, $sql);
            echo("Created");
        }
    } else {
        http_response_code(406);
    }
?>