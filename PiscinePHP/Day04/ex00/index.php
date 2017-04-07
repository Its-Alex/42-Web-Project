<?php
	session_start();
	if ($_GET['submit'] == "OK")
	{
			$_SESSION['login'] = $_GET['login'];
			$_SESSION['passwd'] = $_GET['passwd'];
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Session</title>
</head>
	<body>
		<form action="index.php" method="get">
			<input type="text" name="login" value="<?php if (isset($_SESSION['login'])) {echo $_SESSION['login'];} ?>">
			<input type="password" name="passwd" value="<?php if (isset($_SESSION['passwd'])) {echo $_SESSION['passwd'];} ?>">
			<button type="submit" name="submit" value="OK">OK</button>
		</form>
	</body>
</html>
