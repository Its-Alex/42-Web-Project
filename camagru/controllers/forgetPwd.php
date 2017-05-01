<?php
	require_once dirname(__DIR__)."/models/Database.class.php";
	require_once dirname(__DIR__)."/models/User.class.php";

	$user = new User(null);

	function ret($success, $err) {
		echo json_encode(array('success' => $success, 'err' => $err));
		exit();
	}

	if (empty($_POST['mail']) || filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL) == false)
		ret(false, "Mail incorrect");
	$user->mail = $_POST['mail'];
  if (($user = $user->getUserByMail()) != null)
    ret(false, "L'utilisateur n'existe pas");
  if (User::sendForgotPasswdMailById($user->id) == true)
    ret(true, "");
  else
    ret(false, "Le mail n'as pas été envoyé");
?>