<?php session_start(); ?>
<!DOCTYPE html>
<html>
  <?php
      require_once "./models/database.php";
      // require_once "./config/install.php";
      include("./public/header.php");
    ?>
  <body>
    <?php include("./head_bar.php"); ?>

    <h1 class="super-titre">Bienvenue sur e-Shop !</h1>
    <h1 class="super-titre">Le site de e-commerce en ligne le plus performant !</h1>  
    <img src="https://blog.paymill.com/wp-content/uploads/2016/06/How-to-Keep-Your-E-Commerce-System-Funtioning-at-Optimum-Capacity.png" height=800px>
    <div class= "accueil">
      <div>
        <h2>Dernière nouveautées :</h2>
        <p>Alex a ajouté Cookies (x9)</p>
        <p>Alex a ajouté Ipod</p>
        <p>Alex a ajouté Camping car</p>
      </div>
      <div>
        <h2>Partenaire:</h2>
        <p>Vente du diable</p>
        <p>Vente privé</p>
        <p>Leboncoin</p>
      </div>
    </div>
  </body>
</html>