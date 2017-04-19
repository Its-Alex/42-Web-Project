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
		
		function __construct(array $args)
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
				else
					$this->role = self::USERS;
			}
			else
				$this->role = self::USERS;
			$this->state = self::NEED_VAL;

			User::sendMailById($this->id);
		}

		// Insert user in db
		public function insert()
		{
			$db = Database::getInstance();

			$stmt = $db->prepare("INSERT INTO users (id, name, password, mail, role, state) VALUES (?, ?, ?, ?, ?, ?)");
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

		public static function sendMailById($id)
		{
			// Need to try at 42
		}

		// Get user with his id
		public static function getUserById($id)
		{
			if (Utils::isUuid($id) == false)
				return null;
			$db = Database::getInstance();

			$stmt = $db->prepare("SELECT * FROM users WHERE id = ?");
			$stmt->setFetchMode(PDO::FETCH_INTO, new User(null));

			if ($stmt->execute(array($id))) {
				return $stmt->fetch();
			}
			else {
				return null;
			}
		}

		public static function delUserById($id) {
			if (Utils::isUuid($id) == false)
				return null;
			$db = Database::getInstance();

			$stmt = $db->prepare("UPDATE users SET state = ? WHERE id = ?");
			$stmt->bindValue(1, self::DEL, PDO::PARAM_STR);
			$stmt->bindValue(2, $id, PDO::PARAM_STR);
			$stmt->execute();
			if ($stmt->rowCount() != 0)
				return true;
			else
				return false;
		}
	}
?>