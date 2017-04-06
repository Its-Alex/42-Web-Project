#!/usr/bin/php
<?php
if ($argc > 1)
{
    if (preg_match('#^[A-Za-z][a-z]{4,7} [0-9]{1,2} [A-Za-z][a-z]{2,8} [0-9]{4} [0-2][0-9]:[0-5][0-9]:([0-5][0-9])$#', $argv[1]) === 1)
    {
        $array = explode(" ", $argv[1]);
        if ($array[2] == "janvier" || $array[2] == "Janvier")
            $month = "01";
        if ($array[2] == "fevrier" || $array[2] == "Fevrier")
            $month = "02";
        if ($array[2] == "mars" || $array[2] == "Mars")
            $month = "03";
        if ($array[2] == "avril" || $array[2] == "Avril")
            $month = "04";
        if ($array[2] == "mai" || $array[2] == "Mai")
            $month = "05";
        if ($array[2] == "juin" || $array[2] == "Juin")
            $month = "06";
        if ($array[2] == "juillet" || $array[2] == "Juillet")
            $month = "07";
        if ($array[2] == "aout" || $array[2] == "Aout")
            $month = "08";
        if ($array[2] == "septembre" || $array[2] == "Septembre")
            $month = "09";
        if ($array[2] == "octobre" || $array[2] == "Octobre")
            $month = "10";
        if ($array[2] == "novembre" || $array[2] == "Novembre")
            $month = "11";
        if ($array[2] == "decembre" || $array[2] == "Decembre")
            $month = "12";
        $time = explode(":", $array[4]);
        if (intval($time[0]) >= 24 || intval($time[0]) >= 60 || intval($time[0]) >= 60 || intval($array[1]) > 31 || intval($array[1]) <= 0)
        {
            echo "Wrong Format\n";
            exit();
        }
        if (($array[0] == "Lundi" || $array[0] == "lundi") &&
            ($array[0] == "Mardi" || $array[0] == "mardi") &&
            ($array[0] == "Mercredi" || $array[0] == "mercredi") &&
            ($array[0] == "Jeudi" || $array[0] == "jeudi") &&
            ($array[0] == "Vendredi" || $array[0] == "vendredi") &&
            ($array[0] == "Samedi" || $array[0] == "samedi") &&
            ($array[0] == "Dimanche" || $array[0] == "dimanche"))
        {
            echo "Wrong Format\n";
            exit();
        }
        $str = $array[1]."/".$month."/".$array[3]." ".$array[4];
        $format = "j/m/Y H:i:s";
        $timezone = new DateTimeZone('Europe/Paris');
        $dateobj = DateTime::createFromFormat($format, $str, $timezone);
        echo $dateobj->getTimestamp();
    }
    else {
        echo "Wrong Format\n";
    }
}
?>