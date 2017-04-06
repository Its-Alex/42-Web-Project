<?php header("Content-Type: text/html"); ?>
<html><body>
<?php
	if (strcmp($_SERVER['PHP_AUTH_USER'], "zaz") === 0 && strcmp($_SERVER['PHP_AUTH_PW'], "jaimelespetitsponeys") === 0) {
		$img = file_get_contents('../img/42.png');
		$img_encode = base64_encode($img);
		echo "Bonjour Zaz<br/>\n<img src='data:image/png;base64,".$img_encode."'>\n";
	}
?>
</body></html>
