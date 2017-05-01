<?php
	header("Location: ../index.php");
	$success = false;

	if ($_GET['method'] == 'signin')
		if (User::userStateRegist($_GET['id']) == true)
			$success = true;

	echo json_encode(array('success' => $success, 'err' => $err));
?>