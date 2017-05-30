<?php
	require dirname(__DIR__).'/config/database.php';
  $sql = file_get_contents("./database.sql");

  $pdo = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD, $DB_EXTRA_PARAMS);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->query($sql);
  $pdo = null;
?>
