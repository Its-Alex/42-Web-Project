 <?php
    session_start();

	require_once dirname(__DIR__)."/models/Post.class.php";
	require_once dirname(__DIR__)."/models/Like.class.php";
	require_once dirname(__DIR__)."/models/Utils.class.php";

    function ret($success, $err, $data) {
		echo json_encode(array('success' => $success, 'data' => $data,'err' => $err));
		exit();
	}

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            if (empty($_GET['id']) || !isset($_GET['id']))
                ret(false, "Empty field", null);
            if (Utils::isUuid($_GET['id']) === false)
                ret(false, "Wrong id", null);

            $like = new Like(null);
            $like->post = $_GET['id'];
            $likes = $like->getLikesByPost();

            ret(true, '', array('likes' => $likes, 'count' => count($likes)));
            break;
        case 'POST':
            break;
        case 'PUT':
            $params = Utils::parseArgs(file_get_contents("php://input"));
            if (empty($params['token']) || !isset($params['token']) || empty($params['id']) || !isset($params['id']))
                ret(false, "Empty field", null);

            $like = new Like(null);
            $like->user = $params['token'];
            $like->post = $params['id'];

            ret(true, '', $like->getUserLikePost());
            break;
        case 'DELETE':
            $params = Utils::parseArgs(file_get_contents("php://input"));

            
            break; 
        default:
            ret(false, 'API ERROR', null);
            break;
    }
?>