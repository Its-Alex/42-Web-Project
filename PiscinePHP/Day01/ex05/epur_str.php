#!/usr/bin/php
<?php
    if ($argc == 2)
    {
        $str = "";
        $array = explode(" ", $argv[1]);
        foreach ($array as $key => $value)
            if (strlen($value) !== 0)
                $str .= $value . " ";
        echo substr($str, 0, strlen($str) - 1);
    }
?>