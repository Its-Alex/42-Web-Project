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
            if (empty($_POST['token']) || !isset($_POST['token'])  || empty($_POST['id']) || !isset($_POST['id']))
                ret(false, "Champs vide", null);
            if (Utils::isUuid($_POST['id']) === false || Utils::isUuid($_POST['token']) === false)
                ret(false, "Invalid params", null);

            
            break;
        case 'POST':
            break;
        case 'PUT':
            $params = Utils::parseArgs(file_get_contents("php://input"));


            break;
        case 'DELETE':
            $params = Utils::parseArgs(file_get_contents("php://input"));

            
            break;        
        default:
            ret(false, 'API ERROR', null);
            break;
    }
?>