#!/usr/bin/php
<?php
	function strlen_array($arr) {
		$count = 0;
		foreach ($arr as $key => $value)
			$count++;
		return ($count);
	}


	$content = "";
	$handle = fopen("php://stdin", 'r'); 
	while ($line = fgets($handle)){
		$content .= $line;
	}
	$array = explode("\n", $content);
	$user = array();
	$moy = array();
	foreach ($array as $key => $value)
	{
		$current_user = explode(";", $value);
		if ($key != 0 && array_key_exists($current_user[0], $user) == FALSE && isset($current_user[0]) && strlen($current_user[0]) > 0)
			foreach ($array as $k => $v)
			{
				$search_user = explode(";", $v);
				if (isset($search_user[0]) && strlen($search_user[0]) > 0)
				{
					if ($current_user[0] == $search_user[0])
					{
						if (array_key_exists($current_user[0], $user) == true)
						{
							if (isset($search_user[1]) && strlen($search_user[1]) >= 1)
								array_push($user[$current_user[0]]['Note'], intval($search_user[1]));
							if (isset($search_user[2]) && strlen($search_user[3]) >= 1)
								array_push($user[$current_user[0]]['Noteur'], $search_user[2]);
							if (isset($search_user[3]) && strlen($search_user[2]) >= 1)
								array_push($user[$current_user[0]]['Feedback'], intval($search_user[3]));
						}
						else
						{
							$user[$current_user[0]] = array("Note" => array(intval($search_user[1])),
																							"Noteur" => array($search_user[2]),
																							"Feedback" => array(intval($search_user[3])));						
						}
					}
				}
			}
	}



	foreach ($user as $key => $value)
	{
		foreach ($value as $k => $v)
		{
			if ($k == "Note")
			{
				$moy[$key] = 0;
				foreach ($v as $cle => $valeur)
				{
					$moy[$key] += $valeur;
				}
				$moy[$key] /= strlen_array($v);
			}
		}
	}
	sort($moy);
	foreach ($moy as $key => $value) {
		echo $key.";".$value."\n";
	}
?>