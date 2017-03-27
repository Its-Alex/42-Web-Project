#!/usr/bin/php
<?php
    date_default_timezone_set('Europe/paris');
	$usr = get_current_user();
	$file = file_get_contents("/var/run/utmpx");
	$sub = substr($file, 1256);
	$result = array();
	$format = 'a256user/a4id/a32support/ipid/itype/I2time/a256host';
	while ($sub != NULL) {
		$array = unpack($format, $sub);
		if (strcmp(trim($array['user']), $usr) == 0 && $array['type'] == 7)
		{
			$date = date("M  j H:i", $array["time1"]);
			$support = trim($array['support']);
			$support = $support . "  ";
			$usrr = trim($array['user']);
			$usrr = $usrr . "  ";
			$tab = array($usrr.$support.$date);
			$result = array_merge($result, $tab);
		}
		$sub = substr($sub, 628);		
	}
	sort($result);
	foreach ($result as $elem) {
		echo $elem;
		echo "\n";
	}
?>