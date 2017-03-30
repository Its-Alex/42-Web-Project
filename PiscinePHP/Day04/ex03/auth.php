<?php
function auth($login, $passwd)
{
	$array = unserialize(file_get_contents("./private/passwd"));
	if (isset($login) && isset($passwd) && strlen($passwd) > 0 && strlen($login) > 0)
	{
		if (isset($array))
		{
			foreach ($array as $key => $value)
			{
				if (strcmp($value['login'], $login) === 0)
				{
					if (strcmp($value['passwd'], hash("whirlpool", $passwd)) === 0)
						echo "TRUE";
					else
						echo "FALSE";
				}
			}
		}
		else
			echo "FALSE";
	}
	else
	{
		echo "FALSE";
	}
}
?>