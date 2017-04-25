<?php
  require_once dirname(__DIR__)."/models/Database.class.php";
	require_once dirname(__DIR__)."/models/User.class.php";

  echo json_encode(array("msg" => User::getMailById("e1f6b695-14df-40f6-aca3-76c18802772d")));
?>