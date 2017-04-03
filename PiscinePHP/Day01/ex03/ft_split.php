#!/usr/bin/php
<?php
	function ft_split($str)
	{
		if (is_string($str))
		{
			$array = explode(" ", $str);
			$array = array_filter($array);
			sort($array);
			return $array;
		}
		else
			return NULL;
	}
?>