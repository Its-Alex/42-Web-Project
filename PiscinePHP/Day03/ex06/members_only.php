<?php
	header("WWW-Authenticate: Basic realm=''Espace membres''");
	if (strcmp($_SERVER['PHP_AUTH_USER'], "zaz") === 0 && strcmp($_SERVER['PHP_AUTH_PW'], "jaimelespetitsponeys") === 0)
	{
		$img = file_get_contents('../img/42.png');
		$img_encode = base64_encode($img);
		echo "<html><body>\nBonjour Zaz<br/>\n<img src='data:image/png;base64,".$img_encode."'>\n</body></html>\n";
	}
	else
		echo  "<html><body>Cette zone est accessible uniquement aux membres du site</body></html>\n";
?>
