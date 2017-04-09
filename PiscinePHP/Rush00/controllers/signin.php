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

	if (empty($_POST['mail']) || empty($_POST['passwd']))
		$err .= "empty";
	if (strlen($_POST['passwd']) < 6 || strlen($_POST['passwd']) > 25 || !preg_match("#[a-zA-Z0-9!^$()[\]{}?+*.\\\-]#", $_POST['passwd']))
		$err .= "password";
	if (strlen($_POST['mail']) < 6 || strlen($_POST['mail']) > 30 || filter_var($_POST[mail], FILTER_VALIDATE_EMAIL) == false)
		$err .= "'mail'";
	if (strcmp($err, "") == 0)
	{
		if (connectUser($_POST['passwd'], $_POST['mail']) == true)
			$success = "true";
		else
			error($success, "DB");
	}
	header("Location: ../index.php");
  echo json_encode(array('success' => $success, 'err' => $err));
?>