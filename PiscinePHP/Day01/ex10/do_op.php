#!/usr/bin/php
<?php
if ($argc === 4) {
    $argv[1] = trim($argv[1]);
    $argv[2] = trim($argv[2]);
    $argv[3] = trim($argv[3]);

    if (preg_match("#^(( +)?)\+(( +)?)$#", $argv[2]))
        $result = intval($argv[1]) + intval($argv[3]);
    else if (preg_match("#^(( +)?)-(( +)?)$#", $argv[2]))
        $result = intval($argv[1]) - intval($argv[3]);
    else if (preg_match("#^(( +)?)/(( +)?)$#", $argv[2]))
        $result = intval($argv[1]) / intval($argv[3]);
    else if (preg_match("#^(( +)?)\*(( +)?)$#", $argv[2]))
        $result = intval($argv[1]) * intval($argv[3]);
    else if (preg_match("#^(( +)?)%(( +)?)$#", $argv[2]))
        $result = intval($argv[1]) % intval($argv[3]);
    if (isset($result))
        echo $result."\n";
    else
        echo "Incorrect Parameters\n";
}
else {
    echo "Incorrect Parameters\n";
}
?>