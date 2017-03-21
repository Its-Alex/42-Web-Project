#!/usr/bin/php
<?php
$line;
while (1) {
    echo "Entrer un nombre: ";
    $line = trim(fgets(STDIN));
    if ($line == NULL) {
        echo "^D\n";
        break;
    }
    if (preg_match("#[^0-9]#", $line))
        echo "'$line' n'est pas un chiffre\n";
    else {
        $nombre = intval($line);
        if ($nombre % 2 === 0)
            echo "Le chiffre $nombre est Pair\n";
        else
            echo "Le chiffre $nombre est Impair\n";
    }
}
?>
