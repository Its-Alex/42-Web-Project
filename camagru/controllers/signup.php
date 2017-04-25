<?php
	require_once dirname(__DIR__)."/models/Database.class.php";
	require_once dirname(__DIR__)."/models/User.class.php";

	$err = "";
	$success = "false";

	if (empty($_POST['name']) || empty($_POST['passwd']) ||
			empty($_POST['confirmPasswd']) || empty($_POST['mail']))
		$err .= "empty";
	if (strlen($_POST['name']) < 4 || strlen($_POST['name']) > 25 ||
			!preg_match("#[a-zA-Z0-9]#", $_POST['name']))
		$err .= "name";
	if (strlen($_POST['passwd']) < 6 || strlen($_POST['passwd']) > 25 ||
			!preg_match("#[a-zA-Z0-9!^$()[\]{}?+*.\\\-]#", $_POST['passwd']) ||
			strcmp($_POST['passwd'], $_POST['confirmPasswd']) != 0)
		$err .= "password";
	if (strlen($_POST['mail']) < 6 || strlen($_POST['mail']) > 30 ||
			filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL) == false)
		$err .= "mail";
	if (strcmp($err, "") == 0)
	{
		$user = new User(array('name' => $_POST['name'],
												'passwd' => $_POST['passwd'],
												'mail' => $_POST['mail']));
		if ($user->ifMailExist() == false)
		{
			$user->insert();
			if (User::sendRegistMailById($user->id) == false)
				return false;
			$success = "true";	
		}
		else
			$err .= 'mailexist';
	}
	
	echo json_encode(array('success' => $success, 'err' => $err));
?>