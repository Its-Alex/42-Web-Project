<?php
	session_start();
	require_once "../models/articles.php";
	require_once "../controllers/utils.php";

	$err = "";
    $categorie = "";
	$success = "false";

	function error($success, $err)
	{
		header("Location: ../boutique.php");
		echo json_encode(array('success' => $success, 'err' => $err));
		exit;
	}

    // foreach ($_GET as $key => $value) {
    //     echo $key." ==> ".$value."\n";
    // }

    if (!isset($_GET['key']))
        error($success, "no items");

    if (isset($_SESSION['cart'][$_GET['key']]))
        $_SESSION['cart'][$_GET['key']]['count']++;
    else
    {
        $_SESSION['cart'][$_GET['key']] = array('product' => $_SESSION['articles'][$_GET['key']],
                                                'count' => 1);
    }


	header("Location: ../boutique.php");
	echo json_encode(array('success' => $success, 'err' => $err));
?>