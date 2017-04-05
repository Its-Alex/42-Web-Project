#!/usr/bin/php
<?php
	function ft_is_sort($array)
	{
		$sort = 0;
		$tabSort = $array;
		sort($array);
		foreach ($array as $key => $value)
			echo $key." : ".$array[$key]." <===> ".$tabSort[$key]."\n";
			if (strcmp($array[$key], $tabSort[$key]) !== 0)
			{
				$sort++;
				break;
			}
		$tabSort = array_reverse($tabSort);
		foreach ($array as $key => $value)
			echo $key." : ".$array[$key]." <===> ".$tabSort[$key]."\n";
			if (strcmp($array[$key], $tabSort[$key]) !== 0)
			{
				$sort++;
				break;
			}
		if ($sort == 1)
			return true;
		else
			return false;
	}
?>