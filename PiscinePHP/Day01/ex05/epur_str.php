#!/usr/bin/php
<?php
    if ($argc == 2) {
        trim($argv[1], " ");
        echo $argv[1];
    }
?>