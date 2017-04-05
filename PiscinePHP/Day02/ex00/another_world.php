#!/usr/bin/php
<?php
if ($argc > 1) 
	echo preg_replace('#[\s]{1,}#', ' ', trim($argv[1]))."\n";
?>