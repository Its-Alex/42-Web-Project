<?php
	require_once '/Users/malexand/http/MyWebSite/models/Utils.Class.php';
	require_once '/Users/malexand/http/MyWebSite/models/Database.Class.php';

	/*
	** Class User
	*/
	class User
	{
		/*
		** Role constants
		*/
		const USERS = "USER";
		const MODO = "MODERATEUR";
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

			if (!array_key_exists('id', $args) && !array_key_exists('password', $args) && !array_key_exists('name', $args) && !array_key_exists('mail', $args))
				return;

				$this->id = Utils::genUuid();
				$this->passwd = hash("whirlpool", $args['mail'] . $args['password']);
				$this->name = $args['name'];
				$this->mail = $args['mail'];
				if (array_key_exists('role', $args)) {
					if (strcmp($args['role'], self::USERS) == 0 || strcmp($args['role'], self::MODO) == 0)
						$this->role = $args['role'];
				}
				$this->role = self::USERS;
				$this->state = self::NEED_VAL;

				//Need to send mail for confirm user
		}

		// Insert user in db
		public function insert()
		{
			$db = Database::getInstance();

			$stmt = $db->prepare("INSERT INTO USERS (id, name, password, mail, role, state) VALUES (?, ?, ?, ?, ?, ?)");
			$result = $stmt->execute(array($this->id, $this->name, $this->passwd, $this->mail, $this->role, $this->state));
			$db = null;
			return ($result);
		}

		// Check if user exist with his password and mail
		public function ifMailExist()
		{
			$db = Database::getInstance();

			$res = $db->query("SELECT COUNT(*) FROM USERS WHERE mail = '$this->mail'");
			$db = null;
			return $res->fetch()[0];
		}

		// Get user with his id
		public function getUser($id)
		{
			$db = Database::getInstance();

			$stmt = $db->prepare("SELECT * FROM USERS WHERE id = ?");
			$stmt->setFetchMode(PDO::FETCH_INTO, new User(null));

			if ($stmt->execute(array($id))) {
				$db = null;
				return $stmt->fetch();
			}
			else {
				$db = null;
				return null;
			}
		}
	}
?>