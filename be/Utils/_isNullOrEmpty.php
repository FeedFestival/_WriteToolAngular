<?php

    function _isNullOrEmpty($question){
        return (!isset($question) || trim($question)==='' || $question==='NULL');
    }
?>