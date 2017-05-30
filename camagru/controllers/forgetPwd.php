<?php
	require_once dirname(__DIR__)."/models/User.class.php";


	function ret($success, $err) {
		echo json_encode(array('success' => $success, 'err' => $err));
		exit();
	}

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'POST':
			$user = new User(null);

			if (empty($_POST['mail']) || filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL) == false)
				ret(false, "Mail incorrect");
			$user->mail = strtolower($_POST['mail']);
			if (($user = $user->getUserByMail()) == null) {
				ret(false, "L'utilisateur n'existe pas");
			}
			if ($user->sendForgotPasswdMailById() == true)
				ret(true, "");
			else
				ret(false, "Le mail n'as pas été envoyé");
			break;
		case 'PUT':
				$params = Utils::parseArgs(file_get_contents("php://input"));

				if (empty($params['id']) || !isset($params['id'])
						|| empty($params['passwd']) || !isset($params['passwd'])
						|| empty($params['confirmPwd']) || !isset($params['confirmPwd']))
					ret(false, "Wrong data");
				if ($params['passwd'] != $params['confirmPwd'])
					ret(false, "Password does not match");

				$user = new User(null);
				$user->id = $params['id'];
				$user = $user->getUserById();
				if ($user == null)
					ret(false, "User not found");
				$user->passwd = $params['passwd'];
				if ($user->updateUser() == 0)
						ret(false, 'Aucune modification');
				ret(true, '');
			break;
		default:
			ret(false, "API ERROR");
	}
?>