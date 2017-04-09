<?php
  require_once './database.php';
  global $DB_SERVER, $DB_NAME, $DB_USER, $DB_PASSWORD;

  if (!($db = mysqli_connect($DB_SERVER, $DB_USER, $DB_PASSWORD)))
    die("Connection failed: ".mysqli_connect_error());

  $req = explode(";", file_get_contents("./reset.sql"));
  foreach ($req as $key => $value) {
    mysqli_query($db, $value);
  }
  mysqli_close($db);
  header("Location: ../index.php");
?>