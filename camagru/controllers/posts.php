<?php
    session_start();

	require_once dirname(__DIR__)."/models/Post.class.php";
	require_once dirname(__DIR__)."/models/User.class.php";
	require_once dirname(__DIR__)."/models/Utils.class.php";

    function ret($success, $err, $data) {
		echo json_encode(array('success' => $success, 'data' => $data,'err' => $err));
		exit();
	}

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            if (!isset($_GET['limit']) || !isset($_GET['offset']))
                ret(false, 'Empty fields', null);

            if (isset($_GET['author']))
            {
                $post = new Post(null);
                $post->author = $_SESSION['id'];
                $posts = $post->getAllOfAuthor($_GET['limit'], $_GET['offset']);
            }
            else
            {            
                $posts = Post::getAllLimited($_GET['limit'], $_GET['offset']);
            }

            foreach ($posts as $key => $value) {
                $user = new User(null);
                $user->id = $value['author'];
                $user = $user->getUserById();
                $posts[$key]['author'] = $user->name;
            }

            if ($posts === null)
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