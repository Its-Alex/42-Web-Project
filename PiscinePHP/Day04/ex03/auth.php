<?php
function auth($login, $passwd)
{

	if (file_exists("../private/passwd"))
		$array = unserialize(file_get_contents("../private/passwd"));
	else
		return false;
	if (!isset($login) && !isset($passwd) && strlen($passwd) <= 0 && strlen($login) <= 0 && !isset($array))
		return false;
	foreach ($array as $key => $value)
	{
		if ($value['login'] == $login)
			if ($value['passwd'] == hash("whirlpool", $passwd))
				return true;
	}
	return false;
}
?>