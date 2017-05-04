<?php
	session_start();

	require_once dirname(__DIR__)."/models/User.class.php";

	$user = new User(null);

	function ret($success, $err) {
		echo json_encode(array('success' => $success, 'err' => $err));
		exit();
	}

	if (empty($_POST['mail']) || empty($_POST['passwd']))
		ret(false, "Champ(s) vide(s)");
	if (strlen($_POST['passwd']) < 6 || strlen($_POST['passwd']) > 25 ||
			!preg_match("#[a-zA-Z0-9!^$()[\]{}?+*.\\\-]#", $_POST['passwd']))
		ret(false, "Le mot de passe ne doit pas contenir de caractères spéciaux <br/>et<br/> doit être compris entre 6 et 25 caractères");
	if (strlen($_POST['mail']) < 6 || strlen($_POST['mail']) > 30 ||
			filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL) == false)
		ret(false, "Mail invalide");
	$user->mail = $_POST['mail'];
	if (($user = $user->getUserByMail()) == null)	
		ret(false, "L'utilisateur n'existe pas");
	if ($user->passwd != hash("whirlpool", $_POST['mail'] . $_POST['passwd']))
		ret(false, "Mot de passe incorrect");
	if ($user->state != User::REGISTER)
		ret(false, "Vous n'avez pas activé votre compte");
	$_SESSION['id'] = $user->id;
	$_SESSION['mail'] = $user->mail;
	$_SESSION['role'] = $user->role;
	ret(true, '');
?>