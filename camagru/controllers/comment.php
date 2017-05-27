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

            $comment = new Comment(null);
            $comment->post = $_GET['id'];

            ret(true, '', array($comment->getCommentsByPost());
            break;
        case 'POST':
            if (empty($_SESSION['id']) || !isset($_SESSION['id']) || empty($_POST['id']) || !isset($_POST['id']) || empty($_POST['comment']) || !isset($_POST['comment']))
                ret(false, "Empty field", null);

            $comment = new Comment(array('post' => $_POST['id'] , 'author' => $_SESSION['id'], 'comment' => $_POST['comment']));

            if ($comment->insert() === true)
                ret(true, null, null);
            else
                ret(false, null, null);
            break;
        case 'PUT':
            // $params = Utils::parseArgs(file_get_contents("php://input"));            
            break;
        case 'DELETE':
            // $params = Utils::parseArgs(file_get_contents("php://input"));
            break; 
        default:
            ret(false, 'API ERROR', null);
            break;
    }
?>