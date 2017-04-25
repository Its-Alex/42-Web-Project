<?php
    session_start();
    
	$array = array();

    if (array_key_exists("id", $_SESSION))
        $array["id"] = $_SESSION["id"];
    if (array_key_exists("mail", $_SESSION))
        $array["mail"] = $_SESSION["mail"];
    if (array_key_exists("role", $_SESSION))
        $array["role"] = $_SESSION["role"];
    echo json_encode($array);
?>