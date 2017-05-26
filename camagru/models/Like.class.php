<?php
	require_once dirname(__DIR__).'/models/Database.class.php';
	require_once dirname(__DIR__).'/models/Utils.class.php';

	/*
	** Class User
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

			$stmt = $db->prepare("INSERT INTO likes (user, post) VALUES (?, ?)");
			$result = $stmt->execute(array($this->user, $this->post));
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
	}
?>