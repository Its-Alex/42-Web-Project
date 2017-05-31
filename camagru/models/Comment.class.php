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

            $stmt = $db->prepare("SELECT * FROM comments WHERE post = ? ORDER BY date DESC");
            $stmt->setFetchMode(PDO::FETCH_ASSOC);

            if ($stmt->execute(array($this->post))) {
                return $stmt->fetchAll();
            }
            else {
                return null;
            }
        }

        public function removeAllComments()
        {
            $db = Database::getInstance();

            $stmt = $db->prepare("DELETE FROM comments WHERE post = ?");
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $stmt->execute(array($this->post));

            if ($stmt->rowCount() != 0)
                return true;
            else
                return false;
        }

        public function removeComment()
        {
            $db = Database::getInstance();

            $stmt = $db->prepare("DELETE FROM comments WHERE id = ?");
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $stmt->execute(array($this->id));

            if ($stmt->rowCount() != 0)
                return true;
            else
                return false;
        }

        public function sendNotif($mail)
        {
            //=====Déclaration des messages au format texte et au format HTML.
            $message_txt = "Un utilisateur vient de mettre un commentaire sur une de tes photos !";
            $message_html = "<html><head></head><body>Un utilisateur vient de mettre un <b>commentaire</b> sur une de tes photos !</body></html>";

            //=====Création de la boundary.
            $boundary = "-----=".md5(rand());
            $boundary_alt = "-----=".md5(rand());
            //=====Définition du sujet.
            $sujet = "Camagru : Nouveau commentaire !";
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