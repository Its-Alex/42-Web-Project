<?php
	session_start();
	if (isset($_GET['submit']) && strcmp($_GET['submit'], "OK") === 0) {
		if (isset($_GET['login'])) {
			$_SESSION['login'] = $_GET['login'];
		}
		if (isset($_GET['passwd'])) {
			$_SESSION['passwd'] = $_GET['passwd'];
		}
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