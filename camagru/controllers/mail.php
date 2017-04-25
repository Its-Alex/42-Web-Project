<?php
	session_start();

	require_once dirname(__DIR__)."/models/Database.class.php";
	require_once dirname(__DIR__)."/models/User.class.php";

	$err = "";
	$success = "false";
	$user = new User(null);

	

	echo json_encode(array('success' => $success, 'err' => $err));
?>