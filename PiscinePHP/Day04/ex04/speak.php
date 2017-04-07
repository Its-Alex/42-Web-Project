<?php session_start(); ?>
<!DOCTYPE html>
<?php
date_default_timezone_set("Europe/Paris");
if ($_SESSION['loggued_on_user'] != "")
{
    if ($_POST['submit'] == "OK" && $_POST['msg'] != "")
    {
        $count = 0;

        if (file_exists("../private/chat"))
        {
            $fp = fopen("../private/chat", "r+");
            if (flock($fp, LOCK_EX | LOCK_NB))
            {
                $array = unserialize(file_get_contents('../private/chat', $array));
                flock($fp, LOCK_UN);
            }
            fclose($fp);
        }
        else
        {
            if (!file_exists("../private/"))
                mkdir("../private");
            $fp = fopen("../private/chat", "c");
            fclose($fp);
            $array = array();
        }

        foreach ($array as $key => $value)
            $count = $key + 1;
        $array[$count] = array("login" => $_SESSION['loggued_on_user'],
                                "time" => time(),
                                "msg" => $_POST['msg']);
        $array = serialize($array);
        $fp = fopen("../private/chat", "r+");
        if (flock($fp, LOCK_EX | LOCK_NB)) {
            file_put_contents('../private/chat', $array);
            flock($fp, LOCK_UN);
        }
        fclose($fp);
    }
?>
<html>
    <head>
        <title>Speak</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script langage="javascript">
            window.top.document.getElementById('FrameID').contentWindow.location.reload(true);
        </script>
    </head>
    <body>
        <form action="speak.php" method="POST">
            <input id="text" type="text" name="msg" placeholder="Entrer votre text ici"/>
            <button name="submit" value="OK">OK</button>
        </form>
    </body>
</html>
<?php
}
else
    echo "Vous n'etes pas connecter :(";
?>