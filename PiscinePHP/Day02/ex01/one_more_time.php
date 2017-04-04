#!/usr/bin/php
<?php
if ($argc > 1)
{
    if (preg_match('#^[A-Za-z][a-z]{4,7} [0-9]{1,2} [A-Za-z][a-z]{2,8} [0-9]{4} [0-2][0-9]:[0-5][0-9]:([0-5][0-9])$#', $argv[1]) === 1)
    {
        $array = explode(" ", $argv[1]);
        if (strcasecmp($array[2], "janvier") === 0)
            $month = "01";
        if (strcasecmp($array[2], "fevrier") === 0)
            $month = "02";
        if (strcasecmp($array[2], "mars") === 0)
            $month = "03";
        if (strcasecmp($array[2], "avril") === 0)
            $month = "04";
        if (strcasecmp($array[2], "mai") === 0)
            $month = "05";
        if (strcasecmp($array[2], "juin") === 0)
            $month = "06";
        if (strcasecmp($array[2], "juillet") === 0)
            $month = "07";
        if (strcasecmp($array[2], "aout") === 0)
            $month = "08";
        if (strcasecmp($array[2], "septembre") === 0)
            $month = "09";
        if (strcasecmp($array[2], "octobre") === 0)
            $month = "10";
        if (strcasecmp($array[2], "novembre") === 0)
            $month = "11";
        if (strcasecmp($array[2], "decembre") === 0)
            $month = "12";
        $time = explode(":", $array[4]);
        if (intval($time[0]) >= 24 || intval($time[0]) >= 60 || intval($time[0]) >= 60 || intval($array[1]) > 31)
        {
            echo "Wrong Format\n";
            exit();
        }
        if ((strcasecmp($array[0], "lundi") != 0 && strcasecmp($array[0], "mardi") != 0
            && strcasecmp($array[0], "mercredi") != 0 && strcasecmp($array[0], "jeudi") != 0
            && strcasecmp($array[0], "vendredi") != 0 && strcasecmp($array[0], "samedi") != 0
            && strcasecmp($array[0], "dimanche") != 0) || !isset($month))
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