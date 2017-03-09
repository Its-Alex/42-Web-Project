<?php
	require 'Database.Class.php';

	function insertUser($name, $password, $role, $state, $mail)
	{
		$db = DATABASE::getInstance();

		$stmt = $db->prepare("INSERT INTO USERS (id, password, role, state, mail) VALUES (:id, :password, :role, :state, :mail)");

		$stmt->bindParam(':id', $name);
		$stmt->bindParam(':password', $password);
		$stmt->bindParam(':role', $role);
		$stmt->bindParam(':state', $state);
		$stmt->bindParam(':mail', $mail);

		$results = $stmt->execute();
		$db = null;
		return ($results);
	}
?>