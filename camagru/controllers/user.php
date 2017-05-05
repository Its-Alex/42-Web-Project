<?php
    session_start();

    require_once dirname(__DIR__)."/models/User.class.php";

    function ret($success, $err) {
        echo json_encode(array('success' => $success, 'err' => $err));
        exit();
    }

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $array = array();

            if (array_key_exists("id", $_SESSION))
                $array["id"] = $_SESSION["id"];
            if (array_key_exists("mail", $_SESSION))
                $array["mail"] = $_SESSION["mail"];
            if (array_key_exists("role", $_SESSION))
                $array["role"] = $_SESSION["role"];
            echo json_encode($array);
            break;
        case 'POST':
            $user = new User(null);

            if (empty($_POST['mail']) || empty($_POST['passwd']))
                ret(false, "Champ(s) vide(s)");
            if (strlen($_POST['passwd']) < 6 || strlen($_POST['passwd']) > 25 ||
                    !preg_match("#[a-zA-Z0-9!^$()[\]{}?+*.\\\-]#", $_POST['passwd']))
                ret(false, "Le mot de passe ne doit pas contenir de caractères spéciaux <br/>et<br/> doit être compris entre 6 et 25 caractères");
            if (strlen($_POST['mail']) < 6 || strlen($_POST['mail']) > 30 ||
                    filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL) == false)
                ret(false, "Mail invalide");
            $user->mail = strtolower($_POST['mail']);
            if (($user = $user->getUserByMail()) == null)	
                ret(false, "L'utilisateur n'existe pas");
            if ($user->passwd != hash("whirlpool", strtolower($_POST['mail']) . $_POST['passwd']))
                ret(false, "Mot de passe incorrect");
            if ($user->state != User::REGISTER)
                ret(false, "Vous n'avez pas activé votre compte");
            $_SESSION['id'] = $user->id;
            $_SESSION['mail'] = $user->mail;
            $_SESSION['role'] = $user->role;
            ret(true, '');
            break;
        case 'PUT':
            $usr = new User(null);
            $usr->id = $_POST['id'];
            $usr = $usr->getUserById();

            if ($usr == null) {
                ret(false, 'User not exist');
                return;
            }

            if (isset($_POST['name']) && empty($_POST['name']) && preg_match("#[a-zA-Z0-9]#", $_POST['name']))
                $usr->name = $_POST['name'];
            if (isset($_POST['mail']) && empty($_POST['mail']) && filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL))
                $usr->mail = $_POST['mail'];
            if (isset($_POST['passwd']) && empty($_POST['passwd']) && preg_match("#[a-zA-Z0-9!^$()[\]{}?+*.\\\-]#", $_POST['passwd']))
                $usr->passwd = hash('whirlpool', strtolower($usr->mail) . $_POST['passwd']);
            if (isset($_POST['role']) && empty($_POST['role']) && ($_POST['role'] == User::USERS || $_POST['role'] == User::MODO))
                $usr->role = $_POST['role'];
            if (isset($_POST['state']) && empty($_POST['state']) && ($_POST['state'] == User::REGISTER || $_POST['state'] == User::FORGET_PWD || $_POST['state'] == User::DEL))
                $usr->staet = $_POST['state'];
            ret(true, '');
            break;
        case 'DELETE':
            $client = new User(null);
            $client->id = $_POST[token];
            $client = $client->getUserById();

            if ($client == null)
                ret(true, 'False token');
            if ($client->role !== User::ADMIN && $client->id !== $_POST['id'])
                ret(true, 'Not authorized');

            $usr = new User(null);
            $usr->id = $_POST['id'];
            $usr = $usr->delUserById();
            ret(true, '');
            break;
        default:
            ret(false, 'API Error');
            break;
    }
?>