#!/usr/bin/php
<?php
if ($argc > 1)
{
    foreach ($argv as $key => $value)
    {
        if ($key !== 0)
        {
            if ($key === 1)
                $array = explode(" ", $value);
            else {
                foreach (explode(" ", $value) as $keys => $val)
                    if (strlen($val) !== 0)
                        array_push($array, $val);
            }
        }
    }
    sort($array);
    foreach ($array as $key => $value)
        echo $value . "\n";
}
?>