<?php
    define("NAME",     "name");
    define("DESCRIPTION",    "description");
    define("GUID", "guid");
    define("USER_ID", "userId");
    define("UPDATED", "updated");

    function _story_getAll($userId) {
        $r = "
        SELECT id, ".NAME.", ".DESCRIPTION.", ".GUID.", ".UPDATED."
        FROM story
        WHERE userId = ".sqlNr($userId)."
        ORDER BY ".UPDATED." DESC;
        ";
        return $r;
    }

    function _story_getLast($userId) {
        $r = "
        SELECT id, ".NAME.", ".DESCRIPTION.", ".GUID.", ".UPDATED."
        FROM story
        WHERE userId = ".sqlNr($userId)."
        ORDER BY ".UPDATED." DESC
        LIMIT 1;
        ";
        return $r;
    }

    function _story_getByIds($story_id, $userId) {
        $r = "
        SELECT id
        FROM story
        WHERE id = ".sqlNr($story_id)."
            AND userId = ".sqlNr($userId)."
        ;";
        return $r;
    }

    function _story_create($story) {
        $r = "
        INSERT INTO story (".NAME.", ".DESCRIPTION.", ".GUID.", userId, ".UPDATED.") VALUES
        (".sqlString($story[NAME]).", ".sqlString($story[DESCRIPTION]).", ".sqlString($story[GUID]).", ".sqlNr($story[USER_ID]).", NOW());
        ";
        return $r;
    }

    function _story_update($story) {
        $r = "
        UPDATE story SET
            ".NAME." = ".sqlString($story[NAME]).",
            ".DESCRIPTION." = ".sqlString($story[DESCRIPTION]).",
            ".UPDATED." = NOW()
        WHERE id = ".sqlNr($story['id'])."
        ";
        return $r;
    }

    function _story_FillStory($row) {
        return array(
            'id' => $row['id'],
            NAME => $row[NAME],
            DESCRIPTION => $row[DESCRIPTION],
            GUID => $row[GUID],
        );
    }
?>