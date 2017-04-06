#!/usr/bin/php
<?php
if ($argc == 2 && substr_count($argv[1], "http") != false)
{
	$con = curl_init($argv[1]);
	curl_setopt($con, CURLOPT_RETURNTRANSFER, 1);
	$data = curl_exec($con);
	preg_match_all("#<img[^>]+>#", $data, $matches);
	curl_close($con);
	
	$argv[1] = explode("/", $argv[1]);
	if (file_exists("./".$argv[1][2]) == FALSE)
		mkdir("./".$argv[1][2]);

	
	foreach ($matches as $key => $value)
	{
		foreach ($value as $k => $v)
		{
			$matches[$key][$k] = substr($matches[$key][$k], strpos($matches[$key][$k], "src=") + 5, strlen($matches[$key][$k]));
			$matches[$key][$k] = substr($matches[$key][$k], 0, strpos($matches[$key][$k], "\""));
		}
	}

	foreach ($matches as $key => $value) {
		foreach ($value as $k => $v) {
			$var = explode("/", $v);
			if ($var[0] == "" || $var[0] == "." || $var [0] == "..")
			{
				$url = substr($v, strpos($v, "/"), strlen($v));
				$matches[$key][$k] = $argv[1][0]."//".$argv[1][2].$url;
			}
		}
	}


	foreach ($matches as $key => $value)
	{
		foreach ($value as $k => $v)
		{
			$count = substr_count($v, ".");
			if ($count != false && $count != 0) {
				$try = explode(".", $v);
				if (substr_count($v, "http") != false && strlen($try[$count]) <= 4)
				{
					$count = substr_count($v, "/");
					$file = explode("/", $v);
					$content = @file_get_contents($v);
					if ($content != false)
						file_put_contents("./".$argv[1][2]."/".$file[$count], $content);
				}
			}
		}		
	}
}
?>