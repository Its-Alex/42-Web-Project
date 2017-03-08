<?php
	function ifUserExist($username, $fname, $lname, $password, $mail)
	{
		require('../config/database.php');

		try {
			$pdo = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD, $DB_EXTRA_PARAMS);
			$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (PDOExeption $e) {
			$msg = 'Erreur dans PDO ' . $e->getLine() . 'L.' . ' : ' . $e->getMessage();
	    echo($msg);
	    return (false);
		}

		$pdo->query("use $DB_NAME");

		$stmt = $pdo->prepare("INSERT INTO USERS (username, firstname, lastname, password, mail) VALUES (:username, :firstname, :lastname, :password, :mail)");

		$stmt->bindParam(':username', $username);
		$stmt->bindParam(':firstname', $fname);
		$stmt->bindParam(':lastname', $lname);
		$stmt->bindParam(':password', $password);
		$stmt->bindParam(':mail', $mail);

		$results = $stmt->execute();
		$pdo = null;
		return ($results);
	}
?>