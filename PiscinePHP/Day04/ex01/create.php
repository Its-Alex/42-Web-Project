<?php
	$count = 0;
	$err = "";

	if (file_exists("../private/passwd"))
		$array = unserialize(file_get_contents("../private/passwd"));
	else {
		if (!file_exists("../private/"))
			mkdir("../private");
		$array = array();
	}
	if ($_POST['submit'] != "OK" || $_POST['login'] == "" || $_POST['passwd'] == "")
		$err = "ERROR\n";
	if ($err != "ERROR\n")
	{
		foreach ($array as $key => $value)
		{
			if ($value['login'] == $_POST['login'])
				$err = "ERROR\n";
			$count = $key + 1;
		}
		if ($err != "ERROR\n")
		{
			$array[$count] = array("login" => $_POST['login'], "passwd" => hash("whirlpool", $_POST['passwd']));
			$array = serialize($array);
			file_put_contents("../private/passwd", $array);
			$err = "OK\n";
		}
	}
	echo $err;
?> 