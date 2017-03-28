<?php
if (strcmp($_GET['action'], "get") === 0)
{
    if (isset($_COOKIE[$_GET['name']])) 
        echo $_COOKIE[$_GET['name']]."\n"; 
}
else if (strcmp($_GET['action'], "del") === 0)
{
    if (isset($_COOKIE[$_GET['name']])) {
        unset($_COOKIE[$_GET['name']]);
        setcookie($_GET['name'], '', time() - 3600, '/');
    }
}
else if (strcmp($_GET['action'], "set") === 0)
{
    setcookie($_GET['name'], $_GET['value'], time() + 3600);
}
?>