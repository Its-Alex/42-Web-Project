<?php
	require_once dirname(__DIR__)."/models/User.class.php";

	function ret($success, $err) {
		echo json_encode(array('success' => $success, 'err' => $err));
		exit();
	}

	if (empty($_POST['name']) || empty($_POST['passwd']) ||
			empty($_POST['confirmPasswd']) || empty($_POST['mail']))
		ret(false, "Certains champs sont vide");
	if (strlen($_POST['name']) < 4 || strlen($_POST['name']) > 25 ||
			!preg_match("#[a-zA-Z0-9]#", $_POST['name']))
		ret(false, "Nom incorrect");
	if (strlen($_POST['passwd']) < 6 || strlen($_POST['passwd']) > 25 ||
			!preg_match("#[a-zA-Z0-9!^$()[\]{}?+*.\\\-]#", $_POST['passwd']))
		ret(false, "Le mot de passe ne doit pas contenir de caractères spéciaux <br/>et<br/> doit être compris entre 6 et 25 caractères");
	if (strcmp($_POST['passwd'], $_POST['confirmPasswd']) != 0)
		ret (false, "Les mots de passe ne correspondent pas");
	if (strlen($_POST['mail']) < 6 || strlen($_POST['mail']) > 30 ||
			filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL) == false)
		ret(false, "Mail incorrect");
	$user = new User(array('name' => $_POST['name'],
											'passwd' => $_POST['passwd'],
											'mail' => $_POST['mail']));
	if ($user->ifMailExist() == false)
	{
		if ($user->sendRegistMailById() == true) {
			$user->insert();
			ret(true, "");
		}
		else
			ret(false, "Le mail n'a pas été envoyé");
	}
	else
		ret(false, "L'email existe déjà");
?>