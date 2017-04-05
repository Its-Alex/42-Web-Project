#!/usr/bin/php
<?php
	if ($argc == 2)
		echo trim(preg_replace("# +#", " ", $argv[1]))."\n";
?>