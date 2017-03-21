#!/usr/bin/php
<?php
function ft_split($str) {
    $array = explode(" ", $str);
    sort($array, SORT_NATURAL);
    return $array;
}
?>