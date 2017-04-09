<?php session_start(); ?>
<!DOCTYPE html>
<html>
  <?php include("./public/header.php"); ?>
  <body>
    <?php include("./head_bar.php"); ?> 
    
    <form class="cat" method="POST" action="./controllers/get_articles.php">
        <label><input type="checkbox" name="multimedia" value="multimedia">Multimedia</label>
        <label><input type="checkbox" name="vehicule" value="vehicule">Vehicule</label>
        <label><input type="checkbox" name="jouet" value="jouet">Jouet</label>
        <label><input type="checkbox" name="voyage" value="voyage">Voyage</label>
        <label><input type="checkbox" name="nourriture" value="nourriture">Nourriture</label>
        <button type="submit" value="OK">OK</button>
    </form>
    <div class="articles">
        <div class="cut"></div>
        <div>
            <p>Name :</p>
            <p></p>
            <p>Image :</p>
            <p></p>
            <p>Prix :</p>
            <p></p>
            <p>Description :</p>
            <p>Action :</p>
        </div>
        <div class="cut"></div>
        <?php
            if (isset($_SESSION['articles']))
            {
                foreach ($_SESSION['articles'] as $key => $value)
                {
        ?>
        <div id="<?php echo $value["id"]; ?>" class="product">
            <p><?php echo $value["name"]; ?></p>
            <img src="<?php echo $value["img"]; ?>" alt="" height="42" width="42">
            <p><?php echo $value["price"]; ?>€</p>
            <div class="content">
                <p><?php echo $value["description"]; ?></p>
                <div class="icon">
                    <div>
                        <a href="./controllers/add_cart.php?key=<?php echo $key; ?>"><i class="medium material-icons icon-black">add</i></a>
                    </div>
                    <div>
                        <a href="./controllers/get_articles.php?id=<?php echo $value["id"]; ?>"><i class="medium material-icons icon-black">delete</i></a>
                    </div>
                </div>    
            </div>
        </div>
        <div class="cut"></div>
        <?php
                }
            }
        ?>
    </div>
  </body>
</html>