<?php
    require_once dirname(__DIR__)."/models/Database.class.php";
	require_once dirname(__DIR__)."/models/User.class.php";

    echo json_encode(array("msg" => User::delUser("acf6fca2-4b23-463f-915f-188af2427054")));
?>