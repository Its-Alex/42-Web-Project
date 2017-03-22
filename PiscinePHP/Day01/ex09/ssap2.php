#!/usr/bin/php
<?php
if ($argc > 1) {
    foreach ($argv as $key => $value) {
        if ($key !== 0) {
            if ($key === 1)
                $array = explode(" ", $value);
            else {
                foreach (explode(" ", $value) as $keys => $val) {
                    if (strlen($val) !== 0)
                        array_push($array, $val);
                }
            }
        }
    }
    $numArray = array("begin");
    $alphaArray = array("begin");
    $specArray = array("begin");

    foreach ($array as $key => $value) {
        if (preg_match('#^[a-zA-Z]#', $value))
            array_push($alphaArray, $value);
        else if (preg_match('#^[0-9]#', $value))
            array_push($numArray, $value);
        else
            array_push($specArray, $value);
    }
    sort($alphaArray, SORT_STRING OR SORT_FLAG_CASE);
    sort($numArray);
    sort($specArray);
    foreach ($alphaArray as $key => $value) {
        if ($key != 0)
            echo $value . "\n";
    }
    foreach ($numArray as $key => $value) {
        if ($key != 0)
            echo $value . "\n";
    }
    foreach ($specArray as $key => $value) {
        if ($key != 0)
            echo $value . "\n";
    }
}
?>