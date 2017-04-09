<?php
    function getInstance() {
		$DB_SERVER = "localhost";
		$DB_NAME = "rush00";
		$DB_USER = "root";
		$DB_PASSWORD = "";

		if ($bdd = mysqli_connect($DB_DSN, $DB_USER, $DB_PASSWORD, $DB_NAME))
		{}
		else
			die("Connection failed: ".mysqli_connect_error());
		return ($bdd);
	}
?>