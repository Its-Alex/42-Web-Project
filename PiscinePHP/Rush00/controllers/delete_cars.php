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

    if (empty($_SESSION['token']) || empty($_SESSION['role']) || $_SESSION['role'] != "ADMIN")
        error($success, "not logged");

    if (isset($_GET['id']))
	    deleteCars($_GET['id']);
	header("Location: ./gestion.php");
?>