<?php
	require_once dirname(__DIR__).'/models/Database.class.php';
	require_once dirname(__DIR__).'/models/Utils.class.php';

	/*
	** Class User
	*/
	class User
	{
		public $id;
		public $author;
		public $post;
		
		function __construct($args)
		{
			if ($args == null)
				return;

			if (!array_key_exists('author', $args) && !array_key_exists('post', $args))
				return;

			$this->author = $args['author'];
			$this->post = $args['post'];
		}

		public function insert()
		{
			$db = Database::getInstance();

			$stmt = $db->prepare("INSERT INTO likes (author, post) VALUES (?, ?)");
			$result = $stmt->execute(array($this->author, $this->post));
			return ($result);
		}

		public function getLikesByPost() {

		}

		public function getAuthorLikePost() {

		}
	}
?>