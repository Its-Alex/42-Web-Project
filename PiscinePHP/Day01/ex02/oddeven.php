#!/usr/bin/php
<?php
$file_handle = @fopen("php://stdin","r");
if ($file_handle) {
    echo "Entrer un nombre: ";
    while (($line = fgets($file_handle, 4096)) !== false) {
        if (strlen($line) > 0);
            $line = substr($line, 0, strlen($line) - 1);
        if (!preg_match("#^[-+]?[0-9]+$#", $line) || strlen($line) === 0)
            echo "'$line' n'est pas un chiffre\n";
        else {
            $nombre = intval($line);
            if ($nombre % 2 === 0)
                echo "Le chiffre $nombre est Pair\n";
            else
                echo "Le chiffre $nombre est Impair\n";
        }
        echo "Entrer un nombre: ";
    }
    if (!feof($file_handle)) {
        echo "Error: unexpected fgets() fail\n";
    }
    fclose($file_handle);
}
?>
