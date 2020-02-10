<?php
	function sqlString($value){
		return ($value == NULL ? "NULL" : "'".$value."'");
	}
	function sqlNr($value){
		return ($value == NULL ? "NULL" : "".$value)."";
	}
?>