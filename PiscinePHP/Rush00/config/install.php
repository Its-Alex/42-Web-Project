<?php
  require_once './database.php';
  global $DB_SERVER, $DB_NAME, $DB_USER, $DB_PASSWORD;

  if (!($con = mysqli_connect($DB_SERVER, $DB_USER, $DB_PASSWORD)))
    die("Connection failed: ".mysqli_connect_error());

  $sql = "CREATE DATABASE ".$DB_NAME;
  if (mysqli_query($con, $sql))
    echo "Database created successfully<br />";
  mysqli_close($con);

  if (!($db = mysqli_connect($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_NAME)))
    die("Connection failed: ".mysqli_connect_error());

  $req = explode(";", file_get_contents("./install.sql"));
  foreach ($req as $key => $value) {
    mysqli_query($db, $value);
  }
  mysqli_close($db);
?>