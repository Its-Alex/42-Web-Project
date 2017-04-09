<?php
    session_start();
    header("Location: ./index.php");
    if (isset($_SESSION['token'])) {
        unset($_SESSION['token']);
        unset($_SESSION['role']);
    }