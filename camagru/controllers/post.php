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
            $post = new Post(null);

            if (Utils::isUuid($_GET['id']) === false)
                ret(false, "Wrong Data", null);

            $post->id = $_GET['id'];
            $post = $post->getPostById();
            if ($post === null)
                ret(false, "Pas de resultat", null);
            else
                ret(true, "", $post);
            break;
        case 'POST':
            $user = new User(null);
            $user->id = $_POST['token'];
            $user = $user->getUserById();
            $uuid = Utils::genUuid();


            if ($user == null)
                ret(false, 'False token', null);
            if ($user->role !== User::ADMIN && $user->role !== User::USERS)
                ret(false, 'Not tokenized', null);

            if (empty($_POST['token']) || !isset($_POST['data'])  || empty($_POST['data']) || !isset($_POST['filter'])  || empty($_POST['filter']))
                ret(false, "Champs vide", null);
            if (Utils::isUuid($_POST['token']) === false || $user === null)
                ret(false, "Auteur invalide", null);

            $post = new Post(array('link' => './public/assets/pictures/'.$uuid.'.png', 'author' => $_POST['token']));
            if ($post->insert() === false)
                ret(false, "Insert Failed", "");

            $path_filter = '../public/tmp/img.png';
            $path_img = '../public/tmp/filter.png';

            $data = $_POST['data'];
            $data = str_replace('data:image/png;base64,', '', $data);
            $data = str_replace(' ', '+', $data);
            $data = base64_decode($data);
            $filter = $_POST['filter'];
            $filter = str_replace('data:image/png;base64,', '', $filter);
            $filter = str_replace(' ', '+', $filter);
            $filter = base64_decode($filter);

            file_put_contents($path_img, $data);
            file_put_contents($path_filter, $filter);
            $size = getimagesize($path_img);
            $width = $size[0];
            $height = $size[1];

            $dest = imagecreatefrompng($path_img);
            $src = imagecreatefrompng($path_filter);
            imagecopy($dest, $src, 0, 0, 0, 0, $width, $height);

            imagepng($dest, '../public/assets/pictures/'.$uuid.'.png');

            ret(true, '', array('uuidDb' => $post->id, 'uuidFile' => $uuid));
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
            if ($post == null)
                ret(false, 'Post not exist', null);
            if ($client == null)
                ret(false, 'False token', null);

            unlink('..'.substr($post->link, 1));

            ret(true, $post->delPostById(), '');
            break;        
        default:
            ret(false, 'API ERROR', null);
            break;
    }
?>