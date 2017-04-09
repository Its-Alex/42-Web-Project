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

    if (empty($_SESSION['token']) || empty($_SESSION['role']))
        error($success, "not logged");
	if (empty($_POST[name]) || empty($_POST[passwd]) || empty($_POST[mail]))
		error($success, "empty");
	if (strlen($_POST[name]) < 4 || strlen($_POST[name]) > 25 || !preg_match("#[a-zA-Z0-9]#", $_POST[name]))
		error($success, "name");
	if (strlen($_POST[passwd]) < 6 || strlen($_POST[passwd]) > 25 || !preg_match("#[a-zA-Z0-9!^$()[\]{}?+*.\\\-]#", $_POST[passwd]))
		error($success, "password");
	if (strlen($_POST[mail]) < 6 || strlen($_POST[mail]) > 30 || filter_var($_POST[mail], FILTER_VALIDATE_EMAIL) == false)
		error($success, "mail");
	if (strcmp($err, "") == 0)
	{
        if (modifiUserName($_SESSION['token'], $_POST[name], $_POST[passwd], $_POST[mail]) == true)
            $success = "true";
        else
            error($success, "DB");
	}
	header("Location: ../index.php");
	echo json_encode(array('success' => $success, 'err' => $err));
?>