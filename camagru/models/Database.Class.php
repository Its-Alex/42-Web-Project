<?php
	require '../config/database.php';

	class Database {
		static function getInstance() {
			global $DB_DSN, $DB_USER, $DB_PASSWORD, $DB_EXTRA_PARAMS;
			try {
				$pdo = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD, $DB_EXTRA_PARAMS);
				$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			} catch (PDOExeption $err) {
				die("DB ERROR: " . $err);
			}
			return ($pdo);
		}
	}
?>