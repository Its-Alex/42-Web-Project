<?php
	require_once dirname(__DIR__).'/models/Database.class.php';
	require_once dirname(__DIR__).'/models/Utils.class.php';

	/*
	** Class Like
	*/
	class Like
	{
		public $id;
		public $user;
		public $username;
		public $post;
		
		function __construct($args)
		{
			if ($args == null)
				return;

			if (!array_key_exists('user', $args) && !array_key_exists('post', $args))
				return;

			$this->user = $args['user'];
			$this->post = $args['post'];
		}

		public function insert()
		{
			$db = Database::getInstance();

			$stmt = $db->prepare("INSERT INTO likes (user, username, post) VALUES (?, ?, ?)");
			$result = $stmt->execute(array($this->user, $this->username, $this->post));
			return ($result);
		}

		public function getLikesByPost()
		{
			$db = Database::getInstance();

			$stmt = $db->prepare("SELECT * FROM likes WHERE post = ? ORDER BY user ASC");
			$stmt->setFetchMode(PDO::FETCH_ASSOC);

			if ($stmt->execute(array($this->post))) {
				return $stmt->fetchAll();
			}
			else {
				return null;
			}
		}

		public function getUserLikePost()
		{
			if (Utils::isUuid($this->user) == false || Utils::isUuid($this->post) == false)
				return null;
			$db = Database::getInstance();

			$stmt = $db->prepare("SELECT * FROM likes WHERE user = ? AND post = ?");
			$stmt->execute(array($this->user, $this->post));
			if ($stmt->rowCount() != 0)
				return true;
			else
				return false;
		}

		public function removeLike()
		{
			if (Utils::isUuid($this->user) == false || Utils::isUuid($this->post) == false)
				return null;
			$db = Database::getInstance();

			$stmt = $db->prepare("DELETE FROM likes WHERE user = ? AND post = ?");
			$stmt->execute(array($this->user, $this->post));
			if ($stmt->rowCount() != 0)
				return true;
			else
				return false;
		}

		public function removeAllLike()
		{
			if (Utils::isUuid($this->post) == false)
				return null;
			$db = Database::getInstance();

			$stmt = $db->prepare("DELETE FROM likes WHERE post = ?");
			$stmt->execute(array($this->post));
			if ($stmt->rowCount() != 0)
				return true;
			else
				return false;
		}

		public function sendNotif($mail)
		{
			//=====Déclaration des messages au format texte et au format HTML.
			$message_txt = "Un utilisateur vient de mettre un like sur une de tes photos !";
			$message_html = "<html><head></head><body>Un utilisateur vient de mettre un <b>like</b> sur une de tes photos !</body></html>";
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
			return mail($mail, $sujet, $message, $header);
		}
	}
?>