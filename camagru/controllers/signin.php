<?php
	session_start();

	require_once dirname(__DIR__)."/models/Database.class.php";
	require_once dirname(__DIR__)."/models/User.class.php";

	$err = "";
	$success = "false";
	$user = new User(null);

	if (empty($_POST['mail']) || empty($_POST['passwd']))
		$err .= "empty";
	if (strlen($_POST['passwd']) < 6 || strlen($_POST['passwd']) > 25 ||
			!preg_match("#[a-zA-Z0-9!^$()[\]{}?+*.\\\-]#", $_POST['passwd']))
		$err .= "password";
	if (strlen($_POST['mail']) < 6 || strlen($_POST['mail']) > 30 ||
			filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL) == false)
		$err .= "mail";
	$user->mail = $_POST['mail'];
	$user->passwd = hash("whirlpool", $_POST['mail'] . $_POST['passwd']);
	if (strcmp($err, "") == 0)
	{
		if ($user->ifMailExist() == false)
			$err .= "userNotFound";
		else
		{
			if (($user = $user->signin()) != null)
			{
				if ($user->state != User::REGISTER)
					$err .= "needValid";
				else
				{
					$_SESSION['id'] = $user->id;
					$_SESSION['mail'] = $user->mail;
					$_SESSION['role'] = $user->role;
					$success = true;
				}
			}
			else
				$err .= "wrongPasswd";
		}
	}

	echo json_encode(array('success' => $success, 'err' => $err));
?>