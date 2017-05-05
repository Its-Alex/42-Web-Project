<?php
	// header("Location: ../index.php");
	$success = false;

	require_once dirname(__DIR__)."/models/User.class.php";

	$user = new User(null);
	$user->id = $_GET['id'];

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'POST':
			if ($user->userStateRegist() == true)
				$success = true;
			break;
		case 'PUT':
			if ($user->userStateRegist() == true)
				$success = true;
			break;		
		default:
			break;
	}

	echo json_encode(array('success' => $success, 'err' => ""));
?>