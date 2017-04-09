<?php
	session_start();
	require_once "../models/articles.php";
	require_once "../controllers/utils.php";

	$err = "";
    $categorie = "";
	$success = "false";

	function error($success, $err)
	{
		header("Location: ../gestion.php");
		echo json_encode(array('success' => $success, 'err' => $err));
		exit;
	}

    if (empty($_SESSION['token']) || empty($_SESSION['role']) || $_SESSION['role'] != "ADMIN")
        error($success, "not logged");

    if (!isset($_POST['name']) || !isset($_POST['description']) || !isset($_POST['price']))
        error($success, "not true form");

    if (!filter_var($_POST['img'], FILTER_VALIDATE_URL) !== false)
        $_POST['img'] = null;
    
    if (isset($_POST['multimedia']))
        $categorie .= '0';
    if (isset($_POST['vehicule']))
        $categorie .= '1';
    if (isset($_POST['jouet']))
        $categorie .= '2';
    if (isset($_POST['voyage']))
        $categorie .= '3';
    if (isset($_POST['nourriture']))
        $categorie .= '4';
    if (insertItem($_POST['name'], $_POST['img'], $_POST['description'], $_POST['price'], $categorie) == true)
        $success = "true";
	header("Location: ../gestion.php");
	echo json_encode(array('success' => $success, 'err' => $err));
?>