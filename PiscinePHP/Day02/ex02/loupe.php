#!/usr/bin/php
<?php
function ft_strtoupper_t($str)
{
	$t = strstr($str, ">", 1);
	$t = strtoupper($t);
	$t = $t . strstr($str, ">");
	return($t);
}

function ft_struper($str)
{
	$t = strstr($str, ">");
	$t = strtoupper($t);
	$e = strstr($str, ">", 1) . $t;
	return ($e);
}

if ($argc > 1)
{
	$file = file_get_contents($argv[1]);
	$fd = explode('title', $file);
	$length = count($fd) - 1;
    for ($count = 0; $count < $length; $count++) { 
        if (preg_match("/\s{0,}=/", $fd[$count]) >= 1) {
            $fd[$count] = ft_strtoupper_t($fd[$count]);
        }
    }
	$str = implode('title', $fd);
	$te = explode('<', $str);
	$count = count($te);
	$f = 0;
	while ($f != $count) {
		if (strstr($te[$f], "href") != FALSE)
			$te[$f] = ft_struper($te[$f]);
		$f++;
	}
	$str = implode('<', $te);
	echo $str;
}
?>
