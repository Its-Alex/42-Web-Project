<?php
    session_start();

	require_once dirname(__DIR__)."/models/Post.class.php";
	require_once dirname(__DIR__)."/models/User.class.php";
	require_once dirname(__DIR__)."/models/Utils.class.php";

    function ret($success, $err, $data) {
		echo json_encode(array('success' => $success, 'data' => $data,'err' => $err));
		exit();
	}

    switch ($SERVER['REQUEST_METHOD']) {
        case 'GET':
            $posts = Post::getAll();

            if ($post === null)
                ret(false, "Pas de posts", null);
            else
                ret(true, "", $posts);
            break;
        case 'POST':
            ret(false, 'API ERROR', null);
            break;
        default:
            ret(false, 'API ERROR', null);
            break;
    }
?>