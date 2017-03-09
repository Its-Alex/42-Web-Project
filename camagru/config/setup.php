<?php
  require '/Users/malexand/http/MyWebSite/models/Database.Class.php';

  $sql = file_get_contents("config/database.sql");

  $pdo = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD, $DB_EXTRA_PARAMS);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $results = $pdo->query("SHOW DATABASES LIKE '$DB_NAME'");

  if(!$results->rowCount()) {
    $pdo->exec("CREATE DATABASE `$DB_NAME`;
              CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
              GRANT ALL ON `$DB_NAME`.* TO '$DB_USER'@'localhost';
              FLUSH PRIVILEGES;");
  }

  $pdo = Database::getInstance();
  $pdo->query($sql);
  $pdo = null;
?>