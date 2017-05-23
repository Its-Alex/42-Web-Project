<?php
    session_start();

	require_once dirname(__DIR__)."/models/Post.class.php";
	require_once dirname(__DIR__)."/models/User.class.php";
	require_once dirname(__DIR__)."/models/Utils.class.php";

    function ret($success, $err, $data) {
		echo json_encode(array('success' => $success, 'data' => $data,'err' => $err));
		exit();
	}

    function resizePng($im, $dst_width, $dst_height) {
        $width = imagesx($im);
        $height = imagesy($im);

        $newImg = imagecreatetruecolor($dst_width, $dst_height);

        imagealphablending($newImg, true);
        imagesavealpha($newImg, true);
        $transparent = imagecolorallocatealpha($newImg, 255, 255, 255, 127);
        imagefilledrectangle($newImg, 0, 0, $width, $height, $transparent);
        imagecopyresampled($newImg, $im, 0, 0, 0, 0, $dst_width, $dst_height, $width, $height);

        return $newImg;
    }

    function imagecopymerge_alpha($dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $pct){ 
        // creating a cut resource
        $cut = imagecreatetruecolor($src_w, $src_h); 

        // copying relevant section from background to the cut resource
        imagecopy($cut, $dst_im, 0, 0, $dst_x, $dst_y, $src_w, $src_h); 

        // copying relevant section from watermark to the cut resource
        imagecopy($cut, $src_im, 0, 0, $src_x, $src_y, $src_w, $src_h); 

        // insert cut resource to destination image
        imagecopymerge($dst_im, $cut, $dst_x, $dst_y, 0, 0, $src_w, $src_h, $pct); 
    } 

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            
            break;
        case 'POST':
            if (!isset($_POST['data'])  || empty($_POST['data']) || !isset($_POST['path'])  || empty($_POST['path']) || !isset($_POST['filter'])  || empty($_POST['filter']))
                ret(false, 'Empty field', '');

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

            imagepng($dest, '../public/assets/pictures/test.png');

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