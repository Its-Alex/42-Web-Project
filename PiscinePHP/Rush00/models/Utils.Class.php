<?php
	/*
	** Class where I put all functions I need 
	*/
	class Utils
	{
		public static function genUuid()
		{
			$data = random_bytes(16);
			$data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
			$data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
			return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
		}

		public static function isUuid($uuid)
		{
			if (!is_string($uuid) || (preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/', $uuid) !== 1) || strlen($uuid) != 36)
				return (false);
			else
				return (true);
		}
	}
?>