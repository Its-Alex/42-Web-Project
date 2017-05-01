<?php
	session_start();

	require_once dirname(__DIR__)."/models/Database.class.php";
	require_once dirname(__DIR__)."/models/User.class.php";

	$user = new User(null);

	function ret($success, $err) {
		echo json_encode(array('success' => $success, 'err' => $err));
		exit();
	}

	if (empty($_POST['mail']) || empty($_POST['passwd']))
		ret(false, "Certains champs sont vide");
	if (strlen($_POST['passwd']) < 6 || strlen($_POST['passwd']) > 25 ||
			!preg_match("#[a-zA-Z0-9!^$()[\]{}?+*.\\\-]#", $_POST['passwd']))
		ret(false, "Le mot de passe ne doit pas contenir de caractères spéciaux <br/>et<br/> doit être compris entre 6 et 25 caractères");
	if (strlen($_POST['mail']) < 6 || strlen($_POST['mail']) > 30 ||
			filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL) == false)
		ret(false, "Le mail n'est pas valide");
	$user->mail = $_POST['mail'];
	$user->passwd = hash("whirlpool", $_POST['mail'] . $_POST['passwd']);
	if ($user->ifMailExist() == false)
		ret(false, "L'utilisateur n'existe pas");
	else
	{
		if (($user = $user->getUserByMail()) != null)
		{
			if ($user->state != User::REGISTER)
				ret(false, "Vous n'avez pas activé votre compte");
			else
			{
				$_SESSION['id'] = $user->id;
				$_SESSION['mail'] = $user->mail;
				$_SESSION['role'] = $user->role;
				ret(true, '');
			}
		}
		else
			ret(false, "Mot de passe incorrect");
	}
?>