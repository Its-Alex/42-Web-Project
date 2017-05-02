<?php
    session_start();

	require_once dirname(__DIR__)."/models/Post.class.php";

    function ret($success, $err) {
		echo json_encode(array('success' => $success, 'err' => $err));
		exit();
	}

    if (isset($_POST['method']) == false)
        ret(false, "API Error");

    if ($_POST['method'] == 'insert')
    {

    }
?>