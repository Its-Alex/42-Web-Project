<?php
    require_once dirname(__DIR__).'/models/Database.class.php';
    require_once dirname(__DIR__).'/models/Utils.class.php';

    /*
    ** Class Comment
    */
    class Comment
    {
        public $id;
        public $post;
        public $author;
        public $content;
        public $date;
        
        function __construct($args)
        {
            if ($args == null)
                return;

            if (!array_key_exists('post', $args) && !array_key_exists('author', $args) && !array_key_exists('content', $args))
                return;

            $this->post = $args['post'];
            $this->author = $args['author'];
            $this->content = $args['content'];
        }

        public function insert()
        {
            $db = Database::getInstance();

            $stmt = $db->prepare("INSERT INTO comments (post, author, content) VALUES (?, ?, ?)");
            $result = $stmt->execute(array($this->post, $this->author, $this->content));
            return ($result);
        }

        public function getCommentsByPost()
        {
            $db = Database::getInstance();

            $stmt = $db->prepare("SELECT * FROM comments WHERE post = ? ORDER BY date ASC");
            $stmt->setFetchMode(PDO::FETCH_ASSOC);

            if ($stmt->execute(array($this->post))) {
                return $stmt->fetchAll();
            }
            else {
                return null;
            }
        }
    }
?>