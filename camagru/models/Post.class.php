<?php
	require_once dirname(__DIR__).'/models/Database.class.php';
	require_once dirname(__DIR__).'/models/User.class.php';
	require_once dirname(__DIR__).'/models/Utils.class.php';

	/**
	 * Post
	 */
	class Post
	{
    public $id;
    public $link;
    public $author;
    public $date;

    function __construct($args)
    {
        if ($args == null)
            return;
        if (!array_key_exists('link', $args) && !array_key_exists('author', $args))
            return;

        $this->id = Utils::genUuid();
        $this->link = $args['link'];
        $this->author = $args['author'];
    }

    function insert()
    {
      $db = Database::getInstance();

			$stmt = $db->prepare("INSERT INTO posts (id, author, link) VALUES (?, ?, ?)");
			$result = $stmt->execute(array($this->id, $this->author, $this->link));
			return ($result);
    }

    public function getPostById()
    {
      if (Utils::isUuid($this->id) == false)
				return null;
			$db = Database::getInstance();

			$stmt = $db->prepare("SELECT * FROM posts WHERE id = ?");
			$stmt->setFetchMode(PDO::FETCH_INTO, new Post(null));

			if ($stmt->execute(array($this->id))) {
				return $stmt->fetch();
			}
			else {
				return null;
			}
    }

		public function getPostByAuthor()
		{
      if (Utils::isUuid($this->author) == false)
				return null;
			$db = Database::getInstance();

			$stmt = $db->prepare("SELECT posts.id AS id, posts.author AS author, posts.link AS link, posts.date AS date
                                FROM posts INNER JOIN users on users.id = posts.author WHERE posts.author = ?");
			$stmt->setFetchMode(PDO::FETCH_ASSOC);

			if ($stmt->execute(array($this->author))) {
				return $stmt->fetchAll();
			}
			else {
				return null;
			}
    }

    public function updatePostById()
    {
      if (Utils::isUuid($this->id) == false)
				return null;
            $db = Database::getInstance();

            $stmt = $db->prepare("UPDATE posts SET id = ?, author = ?, link = ? WHERE id = ?");
			$result = $stmt->execute($this->author, $this->link, $this->id);
			return ($stmt->rowCount());
    }

    public function delPostById()
    {
			if (Utils::isUuid($this->id) == false)
				return null;
			$db = Database::getInstance();
			echo $this->id;

			$stmt = $db->prepare("DELETE from posts WHERE id = ?");
			$stmt->execute(array($this->id));
			if ($stmt->rowCount() != 0)
				return true;
			else
				return false;
    }

    public function getAllOfAuthor()
    {
      $db = Database::getInstance();

			$stmt = $db->prepare("SELECT * FROM posts ORDER BY date ASC");
			$stmt->setFetchMode(PDO::FETCH_ASSOC);

			if ($stmt->execute(array($this->author))) {
				return $stmt->fetchAll();
			}
			else {
				return null;
			}
    }

    public static function getAll()
    {
			$db = Database::getInstance();

			$stmt = $db->prepare("SELECT * FROM posts ORDER BY date ASC");
			$stmt->setFetchMode(PDO::FETCH_ASSOC);

			if ($stmt->execute()) {
				return $stmt->fetchAll();
			}
			else {
				return null;
			}
    }

    public static function getAllLimited($limit, $offset)
    {
			$db = Database::getInstance();
			$limit = intval($limit);
			$offset = intval($offset);

			$stmt = $db->prepare("SELECT * FROM `posts` ORDER BY date DESC LIMIT :lim OFFSET :off");
			$stmt->setFetchMode(PDO::FETCH_ASSOC);
			$stmt->bindParam(':lim', $limit, PDO::PARAM_INT);
			$stmt->bindParam(':off', $offset, PDO::PARAM_INT);

			if ($stmt->execute()) {
				return $stmt->fetchAll();
			}
			else {
				return null;
			}
    }
	}
?>