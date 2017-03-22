#!/usr/bin/php
<?php
function ft_is_sort($array) {
    $tabSort = $array;
    sort($array);
    foreach ($array as $key => $value) {
        if (strcmp($array[$key], $tabSort[$key]) !== 0)
            return false;
    }
    return true;
}
?>