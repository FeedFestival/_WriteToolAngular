<?php
    define("JSON", "json");

    function _elements_getAll($storyId, $userId) {
        $r = "
        SELECT els.id, els.storyId, els.".JSON."
        FROM elements as els
        INNER JOIN story as st ON st.id = els.storyId
        WHERE st.userId = ".sqlNr($userId)."
            AND els.storyId = ".sqlNr($storyId)."
        ;";
        return $r;
    }

    function _elements_getByStoryId($story_id) {
        $r = "
        SELECT id
        FROM elements
        WHERE storyId = ".sqlNr($story_id).";
        ";
        return $r;
    }

    function _elements_create($json, $storyId) {
        $r = "
        INSERT INTO elements (storyId, json) VALUES
        (".sqlNr($storyId).", ".sqlString($json).")
        ;";
        return $r;
    }

    function _elements_update($json, $storyId, $elements_id) {
        $r = "
        UPDATE elements SET
            json = ".sqlString($json)."
        WHERE storyId = ".sqlNr($storyId)."
            AND id = ".sqlNr($elements_id)."
        ;";
        return $r;
    }
?>