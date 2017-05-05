<?php
	// header("Location: ../index.php");
	$success = false;

	require_once dirname(__DIR__)."/models/User.class.php";

	$user = new User(null);
	$user->id = $_GET['id'];

	if ($_GET['action'] == 'signin')
		if ($user->userStateRegist() == true)
			$success = true;

	echo json_encode(array('success' => $success, 'err' => ""));
?>