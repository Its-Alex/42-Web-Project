#!/usr/bin/php
<?php
if ($argc > 1) {
     $argv[1] = trim($argv[1]);
     $argv[2] = trim($argv[2]);
     $argv[3] = trim($argv[3]);

     if (strcmp($argv[2], "+") === 0)
         $result = intval($argv[1]) + intval($argv[3]);
     if (strcmp($argv[2], "-") === 0)
         $result = intval($argv[1]) - intval($argv[3]);
     if (strcmp($argv[2], "/") === 0)
         $result = intval($argv[1]) / intval($argv[3]);
     if (strcmp($argv[2], "*") === 0)
         $result = intval($argv[1]) * intval($argv[3]);
     if (strcmp($argv[2], "%") === 0)
         $result = intval($argv[1]) % intval($argv[3]);
    echo $result;
}
else {
    echo "Incorrect Parameters\n";
}
?>