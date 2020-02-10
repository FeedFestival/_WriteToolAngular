<?php
	$dir = $_SERVER['DOCUMENT_ROOT']."/GameCrib.Service";
	include($dir."/utils.php");
	include($dir."/base.php");
	include($dir."/DataAccess/user_dao.php");
	include($dir."/DataAccess/app_dao.php");
	include($dir."/DataAccess/social_dao.php");
	include($dir."/DataAccess/setting_dao.php");
	include($dir."/DataAccess/type_dao.php");

	$data = $_POST['data'];

	// 1 => insert parent setting id
	$parent_setting_id = _TryQuerry($conn, 
							setting_Create(NULL, "user_settings", NULL), 
						true);

	// 2 => now insert the settings for the user: probably: unique_id, and email;
	foreach ($data['setting']['settings'] as &$setting) {
		// => get type by prog_id
		$type_id = _getId(_TryQuerry($conn, 
						type_getId($setting['type']['prog_id'], 'user')));
		if ($type_id < 0)
		    $type_id = _TryQuerry($conn, 
							type_Create($setting['type']['prog_id'], $setting['type']['name'], 'user'), 
						true);

		_TryQuerry($conn, 
			setting_Create($type_id, $setting['value'], $parent_setting_id));
	}

	// 3 => create the user
	$user_id = _TryQuerry($conn, 
					user_Create($data['name'], null, null, $parent_setting_id, NULL), 
				true);








	// 4 => now connect the current app with the user.

		$app_id = _getId(_TryQuerry($conn, 
							setting_getColumn("app", $data['current_app']['app_type_prog_id'], $data['current_app']['app_value'])));
	
		// => save the settings between the app and the user, probably a connect identifier from facebook, tiwtter or google.
		$parent_setting_id = _TryQuerry($conn, 
								setting_Create(NULL, "user_con_app_settings", NULL), 
							true);
		$type_id = _getId(_TryQuerry($conn, 
							type_getId($data['current_app']['user_type_prog_id'], 'user_con_app')));
		_TryQuerry($conn, 
			setting_Create($type_id, $data['current_app']['user_value'], $parent_setting_id));


	// 5 => save app user specific settings.

	// 6 => AND create the connection
		_TryQuerry($conn, 
			app_createConnection($user_id, $app_id, $parent_setting_id, $data['current_app']['app_settings']));








	// 7 => if any of his friends use the app, we should add them as connected friends.
	if (count($data['friends']) > 0){
		
		foreach ($data['friends'] as $friend) {
			
			$friend_id = 0;
			// => check if we have them in the database, or we lost them.
			$friend_id = _getId(_TryQuerry($conn, 
							setting_getColumn('user_con_app', 'user_scoped_id', $friend['user_scoped_id'], "user_id")
							));

			print_r(setting_getColumn('user_con_app', 'user_scoped_id', $friend['user_scoped_id'], "user_id"));

			print_r("
			".$friend_id);

			if ($friend_id <= 0) {
				continue;
				// if we don't have them, the user either quit facebook or ...
			} else {
				_TryQuerry($conn, user_addFriend($user_id, $friend_id));
				_TryQuerry($conn, user_addFriend($friend_id, $user_id));
			}
		}
	}

	var_dump($data);
	exit;

?>