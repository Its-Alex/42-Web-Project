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

	if ($_POST['submit'] != "OK" || $_POST['login'] == "" || $_POST['oldpw'] == "" || $_POST['newpw'] == "")
		$err = "ERROR\n";
	if ($err != "ERROR\n")
	{
		foreach ($array as $key => $value)
		{
			if ($value['login'] == $_POST['login'])
			{
				if ($value['passwd'] == hash("whirlpool", $_POST['oldpw']))
					$array[$key]['passwd'] = hash("whirlpool", $_POST['newpw']);
				else
					$err = "ERROR\n";
				$count = 1;
			}
		}
		if ($err != "ERROR\n" && $count == 1)
		{
			$array = serialize($array);
			file_put_contents("../private/passwd", $array);
			$err = "OK\n";
		}
		else
			$err = "ERROR\n";
	}
	echo $err;
?>