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
            
            break;
        case 'POST':
            if (!isset($_POST['data'])  || empty($_POST['data']) || !isset($_POST['path'])  || empty($_POST['path']))
                ret(false, 'Empty field', '');

            $data = $_POST['data']; // Your data 'data:image/png;base64,AAAFBfj42Pj4';
            $data = str_replace('data:image/png;base64,', '', $data);
            $data = str_replace(' ', '+', $data);
            $data = base64_decode($data);

            file_put_contents('../public/assets/pictures/'.$_POST['path'].'.png', $data);
            $size = getimagesize('../public/assets/pictures/test.png');
            $width = $size[0];
            $height = $size[1];

            $mount = imagecopyresized('../public/assets/pictures/'.$_POST['path'].'.png', '../public/assets/pictures/chap1.png', 0, 0, 0, 0, $width, $height, $width, $height);

            echo $mount;

            ret(true, '', '');
            break;
        case 'PUT':
            
            break;
        case 'DELETE':
            
            break;        
        default:
            ret(false, 'API ERROR', null);
            break;
    }
?>