<?php 
  $DB_DSN = 'mysql:host=localhost';
  $DB_USER = 'Alexandre';
  $DB_PASSWORD = 'Alex';
  $DB_NAME = 'camagru';
  $DB_CONTENT = array("users" => array("user" => "CHAR(25)",
                                        "password" => "CHAR(30)",
                                        "mail" => "CHAR(30)",
                                        "age" => "INT"),
                      "tokens" => array("user" => "CHAR(25)",
                                        "token" => "CHAR(255)"),
                      "posts" => array(NULL));
  $DB_EXTRA_PARAMS = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                          PDO::ATTR_PERSISTENT => true);
?>