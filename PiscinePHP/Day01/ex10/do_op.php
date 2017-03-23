#!/usr/bin/php
<?php
if ($argc === 4) {
    $argv[1] = trim($argv[1]);
    $argv[2] = trim($argv[2]);
    $argv[3] = trim($argv[3]);

    if (strpos($argv[2], "+") !== false)
        $result = intval($argv[1]) + intval($argv[3]);
    if (strpos($argv[2], "-") !== false)
        $result = intval($argv[1]) - intval($argv[3]);
    if (strpos($argv[2], "/") !== false)
        $result = intval($argv[1]) / intval($argv[3]);
    if (strpos($argv[2], "*") !== false)
        $result = intval($argv[1]) * intval($argv[3]);
    if (strpos($argv[2], "%") !== false)
        $result = intval($argv[1]) % intval($argv[3]);
    echo $result . "\n";
}
else {
    echo "Incorrect Parameters\n";
}
?>