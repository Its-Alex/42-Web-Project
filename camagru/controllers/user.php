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
            $_SESSION['username'] = $user->name;
            $_SESSION['role'] = $user->role;
            ret(true, '');
            break;
        case 'PUT':
            $params = Utils::parseArgs(file_get_contents("php://input"));

            if (!isset($_SESSION['id']))
                ret(false, 'False token');
            if ($_SESSION['role'] !== User::ADMIN && $_SESSION['id'] !== $params['id'])
                ret(true, 'Not authorized');
 
            $usr = new User(null);
            $usr->id = $params['id'];
            $usr = $usr->getUserById();
            if ($usr == null) {
                ret(false, "L'utilisateur n'existe pas");
                return;
            }

            if (isset($params['name']) && !empty($params['name']))
            {
                if (preg_match("#[a-zA-Z0-9]#", $params['name']))
                    $usr->name = $params['name'];
                else
                    ret(false, "Nom invalide.");
            }
            if (isset($params['passwd']) && !empty($params['passwd']))
            {
                if (preg_match("#[a-zA-Z0-9!^$()[\]{}?+*.\\\-]#", $params['passwd']))
                    $usr->passwd = hash('whirlpool', $usr->mail . $params['passwd']);
                else
                    ret(false, "Mot de passe invalide");
            }
            if (isset($params['role']) && !empty($params['role']) && ($params['role'] == User::USERS || $params['role'] == User::MODO || $params['role'] == User::ADMIN) && $_SESSION['role'] == User::ADMIN)
            {
                $usr->role = $params['role'];
            }
            if (isset($params['state']) && !empty($params['state']) && $_SESSION['role'] === User::ADMIN && ($params['state'] == User::REGISTER || $params['state'] == User::FORGET_PWD || $params['state'] == User::DEL))
            {
                $usr->state = $params['state'];
            }
            if ($usr->updateUser() == 0)
                ret(false, 'Aucune modification');
            ret(true, 'Modification(s) effectuée(s)');
            break;
        case 'DELETE':
            $params = Utils::parseArgs(file_get_contents("php://input"));

            if (!isset($_SESSION['id']))
                ret(false, 'False token');
            if ($_SESSION['role'] !== User::ADMIN && $_SESSION['id'] !== $params['id'])
                ret(true, 'Not authorized');

            $usr = new User(null);
            $usr->id = $params['id'];
            ret($usr->delUserById(), '');
            break;
        default:
            ret(false, 'API Error');
            break;
    }
?>