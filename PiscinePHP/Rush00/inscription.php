<?php session_start(); ?>
<!DOCTYPE html>
<html>
  <?php include("./public/header.php"); ?>
  <body>
    <?php include("./head_bar.php"); ?>

    <form class="inscription" action="./controllers/signup.php" method="POST">
        <input type="text" name="name" placeholder="Identifiants">
        <input type="password" name="passwd" placeholder="Mot de passe">
        <input type="password" name="confirmPw" placeholder="Mot de passe">
        <input type="email" name="mail" placeholder="Mail">
        <button type="submit" name="submit" value="OK">OK</button>
    </form>
  </body>
</html>