<?php
	session_start();
	require_once "../models/articles.php";
	require_once "../controllers/utils.php";

	$err = "";
	$categorie = "";
	unset($_SESSION['articles']);
	$success = "false";

	function error($success, $err)
	{
		header("Location: ../boutique.php");
		echo json_encode(array('success' => $success, 'err' => $err));
		exit;
	}
	
	if (isset($_GET['id']))
		if (!empty($_SESSION['token']) && !empty($_SESSION['role']) && $_SESSION['role'] == "ADMIN")
			removeArticles($_GET['id']);

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

	if ($categorie != "") {
		getArticleByCateg($categorie);
		header("Location: ../boutique.php");
		exit;
	}

	getArticle();
	header("Location: ../boutique.php");
?>