#!/usr/bin/php
<?php
	function ft_split($str)
	{
		if (is_string($str))
		{
			$array = array_filter(explode(" ", $str));
			sort($array);
			return $array;
		}
		else
			return NULL;
	}
?>