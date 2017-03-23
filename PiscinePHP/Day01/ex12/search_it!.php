#!/Users/malexand/.brew/bin/php
<?php

function splitFirst($occu, $str) {
    $val = explode(":", $str);
    foreach ($val as $key => $value) {
        if ($key === 0)
            $array = array($value);
        else if ($key === 1 && count($val) === 2)
            array_push($array, $value);
        else if ($key === 1)
            array_push($array, $value . ":");
        else if ($key != count($val) - 1)
            $array[1] .= $value . ":";
        else
            $array[1] .= $value;
    }
    return $array;
}

if ($argc > 1)
{
    foreach ($argv as $key => $value) {
        if ($key !== 0) {
            $array = splitFirst(":", $value);
            if (count($array) > 1)
                if (!strcmp($argv[1], $array[0]))
                    echo $array[1];
        }
    }
    echo "\n";
}
?>