<?php
  require('database.php');

  try {
    $pdo = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD, $DB_EXTRA_PARAMS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $results = $pdo->query("SHOW DATABASES LIKE '$DB_NAME'");

    if(!$results->rowCount()) {
      $pdo->exec("CREATE DATABASE `$DB_NAME`;
                CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
                GRANT ALL ON `$DB_NAME`.* TO '$DB_USER'@'localhost';
                FLUSH PRIVILEGES;");
    }

    $pdo->query("use $DB_NAME");

    foreach ($DB_CONTENT as $key => $value) {
      $results = $pdo->query("SHOW TABLES LIKE '$key'");

      if (!$results->rowCount()) {
        $pdo->exec("CREATE TABLE `$key` (id INT PRIMARY KEY NOT NULL) ");
      }
      foreach ($value as $cle => $valeur) {
        $results = $pdo->query("SHOW COLUMNS FROM '$key' LIKE '$cle'");

        if (!$results->rowCount()) {
          $pdo->exec("ALTER TABLE '$key'
                      ADD '$cle' '$valeur'");
        }
      }
    }
  } catch (PDOExeption $e) {
    $msg = 'Erreur dans PDO ' . $e->getLine() . 'L.' . ' : ' . $e->getMessage();
    echo($msg);
  }
?>