<?php
    session_start();

    $success = false;

    foreach ($_SESSION as $key => $value) {
        $success = true;
        unset($_SESSION[$key]);
    }

    echo json_encode(array("success" => $success));
?>