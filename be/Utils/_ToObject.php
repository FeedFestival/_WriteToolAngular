<?php

    function toObject($post) {
		if (empty($post)) {
			print_r("POST data is empty");
			http_response_code(405);
			echo json_encode(
				array('Error' => "Method inconsistent.")
			);
			exit;
		}

		$count = count($_POST);
		if ($count > 1){
			print_r("POST data should be one JSON object. Found ".$count.".");
			http_response_code(405);
			echo json_encode(
				array('Error' => "Parameter inconsistent.")
			);
			exit;
		}

		// we send our data as a key- angular problem i guess.
		// so we decode the key and return te dictionay.
		foreach($post as $key => $value) {
			print_r(" JSON = ".$key 
			    );
			return json_decode($key, true);
		}
    }
?>