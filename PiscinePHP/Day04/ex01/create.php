<?php
	if (file_exists("./private/passwd"))
		$array = unserialize(file_get_contents("./private/passwd"));
	else
		mkdir("./private");
	var_dump($array);
	if (isset($_POST['submit']) && strcmp($_POST['submit'], "OK") === 0) {
		if (isset($_POST['login']) && isset($_POST['passwd']) && strlen($_POST['passwd']) > 0) {
			if (isset($array)) {
				foreach ($array as $key => $value) {
					if (strcmp($value['login'], $_POST['login']) === 0) {
						echo "ERROR\n";
						exit();
					}
				}
				array_push($array, array("login" => $_POST['login'], "passwd" => hash("whirlpool", $_POST['passwd'])));
			}
			else
				$array = array(array("login" => $_POST['login'], "passwd" => hash("whirlpool", $_POST['passwd'])));
			$array = serialize($array);
			file_put_contents("./private/passwd", $array);
			echo "OK\n";
		}
		else
			echo "ERROR\n";
	}
	else
		echo "ERROR\n";
?>