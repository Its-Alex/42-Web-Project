#!/usr/bin/php
<?php
    $str = "";
    $start = 0;
    $save = "";
    $array = explode(" ", $argv[1]);
    foreach ($array as $key => $value)
    {
        if (strlen($value) !== 0)
        {
            if ($start != 0)
                echo $value . " ";
            else
            {
                $start = 1;
                $save = $value;
            }
        }
    }
    echo $save;
?>