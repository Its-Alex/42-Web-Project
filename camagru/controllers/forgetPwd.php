<?php
	require_once dirname(__DIR__)."/models/User.class.php";

	$user = new User(null);

	function ret($success, $err) {
		echo json_encode(array('success' => $success, 'err' => $err));
		exit();
	}

	if (empty($_POST['mail']) || filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL) == false)
		ret(false, "Mail incorrect");
	$user->id = strtolower($_POST['mail']);
  if (($user = $user->getUserById()) == null)
    ret(false, "L'utilisateur n'existe pas");
  if ($user->sendForgotPasswdMailById() == true)
    ret(true, "");
  else
    ret(false, "Le mail n'as pas été envoyé");
?>