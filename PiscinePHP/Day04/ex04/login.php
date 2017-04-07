<?php
	session_start();
	include('auth.php');


	if (auth($_POST['login'], $_POST['passwd']) == true)
		$_SESSION['loggued_on_user'] = $_POST['login'];
	else
	{
		$_SESSION['loggued_on_user'] = "";
		header("Location: ./index.html");
		exit;
		
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Chat</title>
		<style>
			html, body {
				margin: 0;
				padding: 0;
			}
			.chat, .speak {
				width: 100%;
			}
		</style>
	</head>
	<body>
		<iframe id="FrameID" class="chat" height=550 src="./chat.php"></iframe>
		<iframe id="FrameID2" class="speak" height=50 src="./speak.php"></iframe>
	</body>
</html>