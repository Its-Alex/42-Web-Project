<?php session_start(); ?>
<!DOCTYPE html>
<html>
  <?php include("./public/header.php"); ?>
  <body>
    <?php include("./head_bar.php"); ?>

    <form class="connexion" action="./controllers/signin.php" method="POST">
        <input type="text" name="mail" placeholder="Mail">
        <input type="password" name="passwd" placeholder="Mot de passe">
        <button type="submit" name="submit" value="OK">OK</button>
    </form>
  </body>
</html>