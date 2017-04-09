<?php
	session_start();
	require_once "../models/users.php";
	require_once "../controllers/utils.php";

	$err = "";
	$success = "false";

	function error($success, $err)
	{
		header("Location: ../index.php");
		echo json_encode(array('success' => $success, 'err' => $err));
		exit;
	}

	if (empty($_POST[name]) || empty($_POST[passwd]) || empty($_POST[confirmPw]) || empty($_POST[mail]))
		error($success, "empty");
	if (strlen($_POST[name]) < 4 || strlen($_POST[name]) > 25 || !preg_match("#[a-zA-Z0-9]#", $_POST[name]))
		error($success, "name");
	if (strlen($_POST[passwd]) < 6 || strlen($_POST[passwd]) > 25 || !preg_match("#[a-zA-Z0-9!^$()[\]{}?+*.\\\-]#", $_POST[passwd]) || strcmp($_POST[passwd], $_POST[confirmPw]) != 0)
		error($success, "password");
	if (strlen($_POST[mail]) < 6 || strlen($_POST[mail]) > 30 || filter_var($_POST[mail], FILTER_VALIDATE_EMAIL) == false)
		error($success, "mail");
	if (strcmp($err, "") == 0)
	{
		if (userExist($_POST['mail']) == false)
			error($success, "user exist");
		else
		{
			if (insertUser($_POST['name'], $_POST['passwd'], $_POST['mail']) == false)
				error($success, "insert user");
			else
				$success = "true";
		}
	}
	header("Location: ../index.php");
	echo json_encode(array('success' => $success, 'err' => $err));
?>