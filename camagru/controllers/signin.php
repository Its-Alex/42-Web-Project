<?php
	require_once dirname(__DIR__)."/models/Database.class.php";
	require_once dirname(__DIR__)."/models/User.class.php";

	$err = "";
	$success = "false";

	if (empty($_POST['mail']) || empty($_POST['passwd']))
		$err .= "empty";
	if (strlen($_POST['passwd']) < 6 || strlen($_POST['passwd']) > 25 || !preg_match("#[a-zA-Z0-9!^$()[\]{}?+*.\\\-]#", $_POST['passwd']))
		$err .= "password";
	if (strlen($_POST['mail']) < 6 || strlen($_POST['mail']) > 30 || filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL) == false)
		$err .= "mail";
	if (strcmp($err, "") == 0)
	{
	}

  echo json_encode(array('success' => $success, 'err' => $err));
?>