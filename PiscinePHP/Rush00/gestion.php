<?php session_start(); ?>
<!DOCTYPE html>
<html>
  <?php include("./public/header.php"); ?>
  <body>
    <?php include("./head_bar.php"); ?> 
    
    <h2><a style="color: red;" href="./config/reset.php">RESTAURER BASE DE DONNEE</a></h2>
    <div class="separation"></div>
    <h1>Supprimer un utilisateur :</h1>
    <div class="users">
        <?php
            if (isset($_SESSION['AllUser']))
                foreach ($_SESSION['AllUser'] as $key => $value) {
                    echo "<p><h3>Name : ".htmlspecialchars($value["name"])."</h3>Mail : ".htmlspecialchars($value["mail"])."</p>";
                    if (isset($_SESSION['AllUser'][$key + 1]))
                        echo "<div class=\"miniseparation\"></div>";
                }
        ?>
    </div>
    <form class="gestion" action="./controllers/delete_user.php" method="POST">
        <input type="text" name="mail" placeholder="Mail">
        <button type="submit" value="OK">Supprimer</button>
    </form>

    <div class="separation"></div>
    <h1>Ajouter un article :</h1>
    <form class="gestion" action="./controllers/add_items.php" method="POST">
        <input type="text" name="name" placeholder="Nom de l'article">
        <input type="url" name="img" placeholder="Lien d'image">
        <textarea name = "description" rows="5" cols="20" placeholder="Description"></textarea>
        <input type="text" name="price" placeholder="Prix">
        <label><input type="checkbox" name="multimedia" value="multimedia">Multimedia</label>
        <label><input type="checkbox" name="vehicule" value="vehicule">Vehicule</label>
        <label><input type="checkbox" name="jouet" value="jouet">Jouet</label>
        <label><input type="checkbox" name="voyage" value="voyage">Voyage</label>
        <label><input type="checkbox" name="nourriture" value="nourriture">Nourriture</label>
        <button type="submit" value="OK">Ajouter l'article</button>
    </form>

    <div class="separation"></div>

    <h1>Commandes passées :</h1>

    <?php
        if (isset($_SESSION['AllUser']))
        {
            foreach ($_SESSION['AllUser'] as $key => $value)
            {
                // var_dump($value);
                if (isset($value['cart']))
                {
                    echo "<p>".htmlspecialchars($value["name"])." ; ".htmlspecialchars($value["mail"]);
                ?> <a href="./controllers/delete_cars.php?id=<?php echo htmlspecialchars($value["id"]); ?>"><i class="medium material-icons icon-black">delete</i></a></p> <?php
                    if (isset($_SESSION['AllUser'][$key + 1]))
                        echo "<div class=\"miniseparation\"></div>";
                }
            }
            unset($_SESSION['AllUser']);
        }
    ?>
  </body>
</html>