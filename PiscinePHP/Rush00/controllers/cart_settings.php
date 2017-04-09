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

    if (isset($_GET['add']))
    {
        $_SESSION['cart'][$_GET['add']]['count']++;
    }
    else if (isset($_GET['del'])) {
        if ($_SESSION['cart'][$_GET['del']]['count'] == 0) {
            unset($_SESSION['cart'][$_GET['del']]);
        }
        $_SESSION['cart'][$_GET['del']]['count']--;
    }
    else
    {
        if (isset($_POST['submit']) && $_POST['submit'] == "OK")
        {
            if (isset($_SESSION['token']) && isset($_SESSION['role']))
            {
                insertCart($_SESSION['token'], serialize($_SESSION['cart']));
                foreach ($_SESSION['cart'] as $key => $value) {
                    unset($_SESSION['cart'][$key]);
                }
            }
        }
    }
    header("Location: ../cart.php");
?>