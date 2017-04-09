<?php 
    session_start();
    require_once "../models/database.php";

    function userExist($mail)
    {
        $db = getInstance();
        $req = mysqli_prepare($db, "SELECT * FROM users WHERE mail = ?");
		if ($req != false)
		{
			mysqli_stmt_bind_param($req, "s", htmlspecialchars($mail));
			mysqli_stmt_execute($req);
            // mysqli_stmt_bind_result($req, $data['id'], $data['name'], $data['passwd'], $data['mail'], $data['role'],$data['date']);
            if (mysqli_stmt_fetch($req) != null) {
                mysqli_close($db);
                return false;
            }
			mysqli_close($db);
			return true;
		}
		else
		{
			mysqli_close($db);
			return false;
		}
        return true;
    }

    function connectUser($passwd, $mail)
    {
        $db = getInstance();
        $req = mysqli_prepare($db, "SELECT * FROM users WHERE passwd = ? AND mail = ?");
		if ($req != false)
		{
            mysqli_stmt_bind_param($req, "ss", hash("whirlpool", htmlspecialchars($mail).htmlspecialchars($passwd)), 
                                            htmlspecialchars($mail));
			mysqli_stmt_execute($req);
            mysqli_stmt_bind_result($req, $data['id'], $data['name'], $data['passwd'], $data['mail'], $data['role'], $data['cart'], $data['date']);
            echo mysqli_error($db);
            while (mysqli_stmt_fetch($req))
            {
                if (isset($data['id']) && isset($data['role']) &&
                    hash("whirlpool", htmlspecialchars($mail).htmlspecialchars($passwd)) == $data['passwd'])
                {
                    $_SESSION['token'] = $data['id'];
                    $_SESSION['role'] = $data['role'];
                    mysqli_close($db);
			        return true;
                }
            }
			mysqli_close($db);
			return false;
		}
		else
		{
			mysqli_close($db);
			return false;
		}
        return true;
    }

    function insertUser($name, $passwd, $mail)
    {
        $db = getInstance();
        $req = mysqli_prepare($db, "INSERT INTO users (id, name, passwd, mail) VALUES (?, ?, ?, ?)");
		if ($req != false)
		{
			mysqli_stmt_bind_param($req, "ssss", genUuid(),
												htmlspecialchars($name),
												hash("whirlpool", htmlspecialchars($mail).htmlspecialchars($passwd)),
												htmlspecialchars($mail));
			mysqli_stmt_execute($req);
			mysqli_close($db);
			return true;
		}
		else
		{
			mysqli_close($db);
			return false;
		}
    }

    function modifiUserName($uuid, $name, $passwd, $mail)
    {
        if (isUuid($uudi))
            return null;
        $db = getInstance();
        $req = mysqli_prepare($db, "UPDATE users SET name = ? WHERE id = ? AND passwd = ?");
		if ($req != false)
		{
			mysqli_stmt_bind_param($req, "sss", $name,
                                            $uuid,
                                            hash("whirlpool", htmlspecialchars($mail).htmlspecialchars($passwd)));
            if (mysqli_stmt_execute($req))
            {
                mysqli_close($db);
                return true;
            }
            else
            {
                mysqli_close($db);
                return false;
            }
		}
		else
		{
			mysqli_close($db);
			return null;
		}
    }

    function getAllUser()
    {
        $array = array();
        $db = getInstance();
        $req = mysqli_prepare($db, "SELECT * FROM users");
		if ($req != false)
		{
			mysqli_stmt_execute($req);
            $result = mysqli_stmt_get_result($req);
            while ($data = mysqli_fetch_assoc($result)) {
                $_SESSION['AllUser'][] = $data;
            }
			mysqli_close($db);
			return $array;
		}
		else
		{
			mysqli_close($db);
			return null;
		}
    }

    function deleteUser($mail)
    {
        $db = getInstance();
        $req = mysqli_prepare($db, "DELETE FROM users WHERE mail = ?");
		if ($req != false)
		{
			mysqli_stmt_bind_param($req, "s", $mail);
            if (mysqli_stmt_execute($req))
            {
                mysqli_close($db);
                return true;
            }
            else
            {
                mysqli_close($db);
                return false;
            }
		}
		else
		{
			mysqli_close($db);
			return null;
		}
    }

    function insertCart($uuid, $cart)
    {
        if (isUuid($uudi))
            return null;
        $db = getInstance();
        $req = mysqli_prepare($db, "UPDATE users SET cart = ? WHERE id = ?");
		if ($req != false)
		{
			mysqli_stmt_bind_param($req, "ss", $cart, $uuid);
            if (mysqli_stmt_execute($req))
            {
                mysqli_close($db);
                return true;
            }
            else
            {
                mysqli_close($db);
                return false;
            }
		}
		else
		{
			mysqli_close($db);
			return null;
		}
    }

    function deleteCars($uuid)
    {
        if (isUuid($uudi))
            return null;
        $db = getInstance();
        $req = mysqli_prepare($db, "UPDATE users SET cart = NULL WHERE id = ?");
		if ($req != false)
		{
			mysqli_stmt_bind_param($req, "s", $uuid);
            if (mysqli_stmt_execute($req))
            {
                mysqli_close($db);
                return true;
            }
            else
            {
                mysqli_close($db);
                return false;
            }
		}
		else
		{
			mysqli_close($db);
			return null;
		}
    }
?>