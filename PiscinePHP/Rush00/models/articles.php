<?php
    session_start();
    require_once "../models/database.php";

    function getArticle()
    {
        $array = array();
        $count = 0;
        $db = getInstance();
        $req = mysqli_prepare($db, "SELECT * FROM articles");
		if ($req != false)
		{
			mysqli_stmt_execute($req);
            $result = mysqli_stmt_get_result($req);
            while ($data = mysqli_fetch_assoc($result))
            {
                $_SESSION['articles'][$count] = $data;
                $count++;
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

    function getArticleById($id)
    {
        $array = array();
        $db = getInstance();
        $req = mysqli_prepare($db, "SELECT * FROM articles WHERE id = ?");
		if ($req != false)
		{
            mysqli_stmt_bind_param($req, "i", $id);
			mysqli_stmt_execute($req);
            $result = mysqli_stmt_get_result($req);
            while ($data = mysqli_fetch_assoc($result)) {
                $_SESSION['articles'][] = $data;
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

    function insertItem($name, $img_url, $description, $price, $categ)
    {
        $db = getInstance();
        $req = mysqli_prepare($db, "INSERT INTO articles (name, img, price, description, categorie) VALUES (?, ?, ?, ?, ?)");
        if ($req != false)
        {
            mysqli_stmt_bind_param($req, "ssiss", htmlspecialchars($name),
                                                $img_url,
                                                intval($price),
                                                htmlspecialchars($description),
                                                htmlspecialchars($categ));
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

    function removeArticles($id)
    {
        $db = getInstance();
        $req = mysqli_prepare($db, "DELETE FROM articles WHERE id = ?");
		if ($req != false)
		{
			mysqli_stmt_bind_param($req, "i", $id);
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

    function getArticleByCateg($categ)
    {
        $array = array();
        $count = 0;
        $db = getInstance();
        $categ = "%".$categ."%";
        $req = mysqli_prepare($db, "SELECT * FROM articles WHERE categorie LIKE ?");
		if ($req != false)
		{
            mysqli_stmt_bind_param($req, "s", $categ);
			mysqli_stmt_execute($req);
            $result = mysqli_stmt_get_result($req);
            while ($data = mysqli_fetch_assoc($result))
            {
                $_SESSION['articles'][$count] = $data;
                $count++;
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
?>