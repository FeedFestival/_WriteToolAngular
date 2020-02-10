<?php
    function _fillClient($row){
		return array(
				'id' => $row['id'],
				'id_device' => $row['id_device'],
				'email' => $row['email'],
                'password' => $row['password'],
                'salt' => $row['salt'],
                'lastname' => $row['lastname'],
                'firstname' => $row['firstname'],
                'phone' => $row['phone'],
                'address1' => $row['address1'],
                'address2' => $row['address2'],
                'city' => $row['city'],
                'county' => $row['county']
			);
    }
?>