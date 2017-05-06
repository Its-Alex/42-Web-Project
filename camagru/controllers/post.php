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
            $post = new Post(null);

            if (Utils::isUuid($_POST['author']) === false)
                ret(false, "Author not found", null);

            $post->author = $_POST['author'];
            $post = $post->getPostsById($_POST['id']);
            if ($post === null)
                ret(false, "Pas de resultat", null);
            else
                ret(true, "", $post);
            break;
        case 'POST':
            $user = new User(null);
            $user->id = $_POST['author'];
            $user = $user->getUserById();

            if (empty($_POST['link']) || empty($_POST['author']))
                ret(false, null, "Champs vide");
            if (preg_match("#[a-zA-Z0-9\/]+#", $_POST['link']))
                ret(false, null, "Lien invalide");
            if (Utils::isUuid($_POST['author']) === false || $user === null)
                ret(false, null, "Auteur invalide");
            $post = new Post($_POST['link'], $_POST['author']);
            if ($post->insert() === true)
                ret(true, null, "");
            break;
        case 'PUT':
            $params = Utils::parseArgs(file_get_contents("php://input"));

            $client = new User(null);
            $client->id = $params['token'];
            $client = $client->getUserById();

            if ($client == null)
                ret(false, 'False token', null);
             
            $post = new Post(null);
            $post->id = $params['id'];
            $post = $post->getPostById();
            if ($post == null) {
                ret(false, 'Post not exist', null);
                return;
            }

            if ($client == null || $author == null)
                ret(false, 'False token', null);
            if ($client->role !== User::ADMIN && $author->id !== $client->id)
                ret(false, 'Not authorized', null);

            $author = new User();
            $author = $post->getAuthor();

            if (isset($params['link']) && !empty($params['link']) && preg_match("#[a-zA-Z0-9\/]+#", $params['link']))
                $post->link = $params['link'];
            if (isset($params['author']) && !empty($params['author']))
                $post->author = $params['author'];
            if ($post->updatePost() == 0)
                ret(false, 'Nothing happend');
            ret(true, '');
            break;
        case 'DELETE':
            $params = Utils::parseArgs(file_get_contents("php://input"));

            $client = new User(null);
            $client->id = $params['token'];
            $client = $client->getUserById();

            $post = new Post(null);
            $post->id = $params['id'];
            $post = $post->getPostById();
            if ($post == null) {
                ret(false, 'Post not exist', null);
                return;
            }

            $author = new User();
            $author = $post->getAuthor();

            if ($client == null || $author == null)
                ret(false, 'False token', null);
            if ($client->role !== User::ADMIN && $author->id !== $client->id)
                ret(false, 'Not authorized', null);

            ret(true, $post->delPostById(), '');
            break;        
        default:
            ret(false, 'API ERROR', null);
            break;
    }
?>