<?php
	require_once dirname(__DIR__).'/models/Database.class.php';
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
            if (!array_key_exists('id', $args) && !array_key_exists('link', $args) && !array_key_exists('author', $args))
                return;

            $args->id = $this->id;
            $args->link = $this->link;
            $args->author = $this->author;
        }

        function insert()
        {
            $db = Database::getInstance();

			$stmt = $db->prepare("INSERT INTO posts (id, author, link) VALUES (?, ?, ?)");
			$result = $stmt->execute(array($this->id, $this->author, $this->link));
			return ($result);
        }
	}
?>