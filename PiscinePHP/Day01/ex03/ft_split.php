#!/usr/bin/php
<?php
	function ft_split($str)
	{
		if (is_string($str))
		{
			$array = explode(" ", $str);
			foreach ($array as $key => $value)
				if (strlen($value) <= 0)
					unset($array[$key]);
			sort($array);
			return $array;
		}
		else
			return NULL;
	}
?>