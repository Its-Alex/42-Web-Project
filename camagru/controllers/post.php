<?php
    session_start();

	require_once dirname(__DIR__)."/models/Post.class.php";
	require_once dirname(__DIR__)."/models/User.class.php";
	require_once dirname(__DIR__)."/models/Utils.class.php";

    function ret($success, $err, $data) {
		echo json_encode(array('success' => $success, 'data' => $data,'err' => $err));
		exit();
	}

    if (isset($_POST['method']) == false)
        ret(false, null, "Method Error");

    if ($_POST['method'] == 'put') {
        if (empty($_POST['link']) || empty($_POST['author']))
            ret(false,null, "Champs vide");
        if (filter_var($_POST['link'], FILTER_VALIDATE_URL) === false)
            ret(false, null, "Lien invalide");
        if (Utils::isUuid($_POST['author']) === false || User::getUserById($_POST['author']) === null)
            ret(false, null, "Auteur invalide");
        $post = new Post($_POST['link'], $_POST['author']);
        if ($post->insert() === true)
            ret(true, null, "");
    } else if ($_POST['method'] == 'get') {
        $posts = Post::getPostsById($_POST['id']);
        if ($posts === null)
            ret(false, "Pas de resultat", null);
        else
            ret(true, "", $posts);
    }
?>