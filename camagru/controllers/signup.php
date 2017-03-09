<?php
	require '/Users/malexand/http/MyWebSite/models/insert.php';

	$err = "";
	$success = "false";

	if (empty($_POST[name]) || empty($_POST[password]) || empty($_POST[mail]))
		$err .= "-empty-";
	if (strlen($_POST[name]) < 4 || strlen($_POST[name]) > 25 || !preg_match("#[a-zA-Z0-9]#", $_POST[name]))
		$err .= "-name-";
	if (strlen($_POST[password]) < 6 || strlen($_POST[password]) > 25 || !preg_match("#[a-zA-Z0-9!^$()[\]{}?+*.\\\-]#", $_POST[password]))
		$err .= "-pasword-";
	if (strlen($_POST[mail]) < 6 || strlen($_POST[mail]) > 30 || filter_var($_POST[mail], FILTER_VALIDATE_EMAIL) == false)
		$err .= "-mail-";
	if (strcmp($err, "") == 0)
		if (insertUser($_POST[name], hash("whirlpool", $POST_[mail] . $_POST[password]), "USER", "NEED_VALID", $_POST[mail]) == true)
			$success = "true";

	echo "{
				\"success\": \"$success\",
				\"err\": \"$err\"
				}";
?>