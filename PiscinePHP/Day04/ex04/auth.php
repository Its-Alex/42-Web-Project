<?php
function auth($login, $passwd)
{
	if (file_exists("../private/passwd"))
		$array = unserialize(file_get_contents("../private/passwd"));
	else
		return false;
	if ($login == "" || $passwd == "")
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