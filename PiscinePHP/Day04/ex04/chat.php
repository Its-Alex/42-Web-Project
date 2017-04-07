<?php
    session_start();
    date_default_timezone_set("Europe/Paris");
    if ($_SESSION['loggued_on_user'] != "")
    {
        if (file_exists("../private/chat"))
        {
            $fp = fopen("../private/chat", "r+");
            if (flock($fp, LOCK_EX | LOCK_NB))
            {
                $array = unserialize(file_get_contents('../private/chat', $array));
                flock($fp, LOCK_UN);
            }
            fclose($fp);

            foreach ($array as $key => $value) {
                $date = date("[H:i]", $value['time']);
                echo $date." <b>".$value[login]."</b>: ".$value['msg']."<br />";
            }
        }
    }
?>