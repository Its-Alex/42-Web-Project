#!/usr/bin/php
<?php

function calc($tab, $operator)
{
    $return = explode($operator, $tab);
    if (preg_match("#[^ 0-9]#", ($return[0])) === 0 && preg_match("#[^ 0-9]#", ($return[1])) === 0) {
        return $return;
    } else {
        return false;
    }
}

if ($argc === 2) {
    $error = 0;
    if (strpos($argv[1], "+") !== false) {
        $array = calc($argv[1], "+");
        if ($array !== false) {
            $result = intval($array[0]) + intval($array[1]);
        } else {
            $error = 1;
        }
    }
    if (strpos($argv[1], "-") !== false) {
        $array = calc($argv[1], "-");
        if ($array !== false) {
            $result = intval($array[0]) - intval($array[1]);
        } else {
            $error = 1;
        }
    }
    if (strpos($argv[1], "/") !== false) {
        $array = calc($argv[1], "/");
        if ($array !== false) {
            $result = intval($array[0]) / intval($array[1]);
        } else {
            $error = 1;
        }
    }
    if (strpos($argv[1], "*") !== false) {
        $array = calc($argv[1], "*");
        if ($array !== false) {
            $result = intval($array[0]) * intval($array[1]);
        } else {
            $error = 1;
        }
    }
    if (strpos($argv[1], "%") !== false) {
        $array = calc($argv[1], "%");
        if ($array !== false) {
            $result = intval($array[0]) % intval($array[1]);
        } else {
            $error = 1;
        }
    }
    if ($result !== null && $error === 0) {
        echo $result . "\n";
    } else {
        echo "Syntax Error\n";
    }
} else {
    echo "Incorrect Parameters\n";
}
?>
