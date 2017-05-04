<?php
  $sql = file_get_contents("./database.sql");

  $pdo = new PDO('mysql:host=sql.itsalex.fr;dbname=camagru', "camagru", "123456", array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->query($sql);
  $pdo = null;
?>