<?php
  require('models/Database.Class.php');

  $sql = file_get_contents("config/database.sql");
  $pdo = Database::getInstance();
  $pdo->query($sql);
  $pdo = null;
?>