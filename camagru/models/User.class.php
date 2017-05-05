<?php
	require_once dirname(__DIR__).'/models/Database.class.php';
	require_once dirname(__DIR__).'/models/Utils.class.php';

	/*
	** Class User
	*/
	class User
	{
		/*
		** Role constants
		*/
		const USERS = "USER";
		const MODO = "MODERATOR";
		const ADMIN = "ADMIN";

		/*
		** State constants
		*/
		const REGISTER = "REGISTERED";
		const NEED_VAL = "NEED_VALID";
		const DEL = "DELETED";
		const FORGET_PWD = "FORGET_PASSWD";

		public $id;
		public $passwd;
		public $name;
		public $mail;
		public $role;
		public $state;
		
		function __construct($args)
		{
			if ($args == null)
				return;

			if (!array_key_exists('id', $args) && !array_key_exists('passwd', $args) && !array_key_exists('name', $args) && !array_key_exists('mail', $args))
				return;

			$this->id = Utils::genUuid();
			$this->passwd = hash("whirlpool", $args['mail'] . $args['passwd']);
			$this->name = $args['name'];
			$this->mail = $args['mail'];
			if (array_key_exists('role', $args)) {
				if (strcmp($args['role'], self::USERS) == 0 || strcmp($args['role'], self::MODO) == 0)
					$this->role = $args['role'];
				else
					$this->role = self::USERS;
			}
			else
				$this->role = self::USERS;
			$this->state = self::NEED_VAL;
		}

		// Insert user in db
		public function insert()
		{
			$db = Database::getInstance();

			$stmt = $db->prepare("INSERT INTO users (id, name, passwd, mail, role, state) VALUES (?, ?, ?, ?, ?, ?)");
			$result = $stmt->execute(array($this->id, $this->name, $this->passwd, $this->mail, $this->role, $this->state));
			return ($result);
		}

		// Check if user exist with his password and mail
		public function ifMailExist()
		{
			$db = Database::getInstance();

			$stmt = $db->prepare("SELECT COUNT(*) FROM users WHERE mail = ?");
			$stmt->bindValue(1, $this->mail, PDO::PARAM_STR);
			$stmt->execute();
			return $stmt->fetch()[0];
		}

		public function updateUser() {
			$db = Database::getInstance();

			$stmt = $db->prepare("UPDATE users SET name = ?, passwd = ?, mail = ?, role = ?, state = ? WHERE id = ?");
			$stmt->execute(array($this->name, $this->passwd, $this->mail, $this->role, $this->state, $this->id));
			return ($stmt->rowCount());
		}

		// Change user state to register
		public function userStateRegist()
		{
			if (Utils::isUuid($this->id) == false)
				return null;
			$db = Database::getInstance();

			$stmt = $db->prepare("UPDATE users SET state = ? WHERE id = ?");
			$stmt->bindValue(1, self::REGISTER, PDO::PARAM_STR);
			$stmt->bindValue(2, $this->id, PDO::PARAM_STR);
			$stmt->execute();
			if ($stmt->rowCount() != 0)
				return true;
			else
				return false;
		}

		// Get user with his id
		public function getUserById()
		{
			if (Utils::isUuid($this->id) == false)
				return null;
			$db = Database::getInstance();

			$stmt = $db->prepare("SELECT * FROM users WHERE id = ?");
			$stmt->setFetchMode(PDO::FETCH_INTO, new User(null));
			if ($stmt->execute(array($this->id))) {
				return $stmt->fetch();
			}
			else {
				return null;
			}
		}

		// Get User with his mail
		public function getUserByMail()
		{
			$db = Database::getInstance();

			$stmt = $db->prepare("SELECT * FROM users WHERE mail = ?");
			$stmt->setFetchMode(PDO::FETCH_INTO, new User(null));
			if ($stmt->execute(array($this->mail))) {
				return $stmt->fetch();
			}
			else {
				return null;
			}
		}

		public function delUserById() {
			if (Utils::isUuid($this->id) == false)
				return null;
			$db = Database::getInstance();

			$stmt = $db->prepare("UPDATE users SET state = ? WHERE id = ?");
			$stmt->execute(array(self::DEL, $this->id));
			if ($stmt->rowCount() != 0)
				return true;
			else
				return false;
		}

		public function sendRegistMailById()
		{
			//=====Déclaration des messages au format texte et au format HTML.
			$message_txt = "Salut à toi, suis ce lien http://localhost:8080/42/camagru/controllers/mail.php?id=".$this->id."&action=signin pour finaliser ton inscription.";
			$message_html = "<html><head></head><body><b>Salut à toi</b>, suis ce <a href=\"http://localhost:8080/42/camagru/controllers/mail.php?id=".$this->id."&action=signin\">lien</a> pour finaliser ton inscription.</body></html>";
			//=====Création de la boundary.
			$boundary = "-----=".md5(rand());
			$boundary_alt = "-----=".md5(rand());
			//=====Définition du sujet.
			$sujet = "Inscription Camagru !";
			//=====Création du header de l'e-mail.
			$header = "From: \"Camagru\"<camagru@gmail.com>".PHP_EOL;
			$header.= "Reply-to: \"\" <>".PHP_EOL;
			$header.= "MIME-Version: 1.0".PHP_EOL;
			$header.= "Content-Type: multipart/mixed;".PHP_EOL." boundary=\"$boundary\"".PHP_EOL;
			//=====Création du message.
			$message = PHP_EOL."--".$boundary.PHP_EOL;
			$message.= "Content-Type: multipart/alternative;".PHP_EOL." boundary=\"$boundary_alt\"".PHP_EOL;
			$message.= PHP_EOL."--".$boundary_alt.PHP_EOL;
			//=====Ajout du message au format texte.
			$message.= "Content-Type: text/plain; charset=\"ISO-8859-1\"".PHP_EOL;
			$message.= "Content-Transfer-Encoding: 8bit".PHP_EOL;
			$message.= PHP_EOL.$message_txt.PHP_EOL;
			$message.= PHP_EOL."--".$boundary_alt.PHP_EOL;
			//=====Ajout du message au format HTML.
			$message.= "Content-Type: text/html; charset=\"ISO-8859-1\"".PHP_EOL;
			$message.= "Content-Transfer-Encoding: 8bit".PHP_EOL;
			$message.= PHP_EOL.$message_html.PHP_EOL;
			//=====On ferme la boundary alternative.
			$message.= PHP_EOL."--".$boundary_alt."--".PHP_EOL;
			$message.= PHP_EOL."--".$boundary.PHP_EOL;
			//=====Envoi de l'e-mail.
			return mail($this->mail, $sujet, $message, $header);
		}

		public function sendForgotPasswdMailById()
		{
			$usr = $this->getUserByMail();
			//=====Déclaration des messages au format texte et au format HTML.
			$message_txt = "Salut à toi, suis ce lien http://localhost:8080/42/camagru/controllers/mail.php?id=".$usr->id."&method=forgetPwd si tu as perdu ton mot de passe.";
			$message_html = "<html><head></head><body><b>Salut à toi</b>, suis ce <a href=\"http://localhost:8080/42/camagru/controllers/mail.php?id=".$usr->id."&method=forgetPwd\">lien</a> si tu as perdu ton mot de passe.</body></html>";
			//=====Création de la boundary.
			$boundary = "-----=".md5(rand());
			$boundary_alt = "-----=".md5(rand());
			//=====Définition du sujet.
			$sujet = "Inscription Camagru !";
			//=====Création du header de l'e-mail.
			$header = "From: \"Camagru\"<camagru@gmail.com>".PHP_EOL;
			$header.= "Reply-to: \"\" <>".PHP_EOL;
			$header.= "MIME-Version: 1.0".PHP_EOL;
			$header.= "Content-Type: multipart/mixed;".PHP_EOL." boundary=\"$boundary\"".PHP_EOL;
			//=====Création du message.
			$message = PHP_EOL."--".$boundary.PHP_EOL;
			$message.= "Content-Type: multipart/alternative;".PHP_EOL." boundary=\"$boundary_alt\"".PHP_EOL;
			$message.= PHP_EOL."--".$boundary_alt.PHP_EOL;
			//=====Ajout du message au format texte.
			$message.= "Content-Type: text/plain; charset=\"ISO-8859-1\"".PHP_EOL;
			$message.= "Content-Transfer-Encoding: 8bit".PHP_EOL;
			$message.= PHP_EOL.$message_txt.PHP_EOL;
			$message.= PHP_EOL."--".$boundary_alt.PHP_EOL;
			//=====Ajout du message au format HTML.
			$message.= "Content-Type: text/html; charset=\"ISO-8859-1\"".PHP_EOL;
			$message.= "Content-Transfer-Encoding: 8bit".PHP_EOL;
			$message.= PHP_EOL.$message_html.PHP_EOL;
			//=====On ferme la boundary alternative.
			$message.= PHP_EOL."--".$boundary_alt."--".PHP_EOL;
			$message.= PHP_EOL."--".$boundary.PHP_EOL;
			//=====Envoi de l'e-mail.
			return mail(getMailById($usr->id), $sujet, $message, $header);
		}
	}
?>