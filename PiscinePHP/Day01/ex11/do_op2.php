#!/usr/bin/php
<?php
    function calc($tab, $operator)
    {
        $return = explode($operator, $tab);
        foreach ($return as $key => $value)
            if (strlen(value) < 1)
                unset($return[$key]);
        $return[0] = trim($return[0]);
        $return[1] = trim($return[1]);
        if (preg_match("#^[0-9]+$#", $return[0]) == 1 && preg_match("#^[0-9]+$#", $return[1]) == 1)
            return $return;
        else
            return false;
    }

    if ($argc === 2)
    {
        $error = 0;
        if (strpos($argv[1], "+") !== false && substr_count($argv[1], "+") == 1)
        {
            $array = calc($argv[1], "+");
            if ($array !== false)
                $result = intval($array[0]) + intval($array[1]);
            else
                $error = 1;
        }
        if (strpos($argv[1], "-") !== false && substr_count($argv[1], "-") == 1)
        {
            $array = calc($argv[1], "-");
            if ($array !== false)
                $result = intval($array[0]) - intval($array[1]);
            else
                $error = 1;
        }
        if (strpos($argv[1], "/") !== false && substr_count($argv[1], "/") == 1)
        {
            $array = calc($argv[1], "/");
            if ($array !== false)
                $result = intval($array[0]) / intval($array[1]);
            else
                $error = 1;
        }
        if (strpos($argv[1], "*") !== false && substr_count($argv[1], "*") == 1)
        {
            $array = calc($argv[1], "*");
            if ($array !== false)
                $result = intval($array[0]) * intval($array[1]);
            else
                $error = 1;
        }
        if (strpos($argv[1], "%") !== false && substr_count($argv[1], "%") == 1)
        {
            $array = calc($argv[1], "%");
            if ($array !== false)
                $result = intval($array[0]) % intval($array[1]);
            else
                $error = 1;
        }
        if ($error == 0 && $result != null && isset($result))
            echo $result."\n";
        else
            echo "Syntax Error\n";
    }
    else
        echo "Incorrect Parameters\n";
?>
