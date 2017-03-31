<?php
	function error() {
		echo "ERROR\n";
		exit();
	}

	if (file_exists("./private/passwd"))
		$array = unserialize(file_get_contents("./private/passwd"));
	else
		mkdir("./private");

	if (!(isset($_POST['submit']) && strcmp($_POST['submit'], "OK") === 0))
		error();
	if (!(isset($_POST['login']) && isset($_POST['oldpw']) && strlen($_POST['oldpw']) > 0
					&& isset($_POST['newpw']) && strlen($_POST['newpw']) > 0 && strlen($_POST['login']) > 0))
		error();
	if (isset($array))
	{
		foreach ($array as $key => $value)
		{
			if (strcmp($value['login'], $_POST['login']) === 0)
			{
				if (strcmp($value['passwd'], hash("whirlpool", $_POST['oldpw'])) == 0)
					$array[$key]['passwd'] = hash("whirlpool", $_POST['newpw']);
				else
					error();
			}
		}
		$array = serialize($array);
		file_put_contents("./private/passwd", $array);
		echo "OK\n";
	}
	else
		error();
?>