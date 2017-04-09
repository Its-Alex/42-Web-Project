<?php session_start(); ?>
<!DOCTYPE html>
<html>
  <?php include("./public/header.php"); ?>
  <body>
    <?php
        include("./head_bar.php"); 
    
        if (isset($_POST['submit']) && $_POST['submit'] == OK)
            unset($_SESSION['cart']);
    ?> 

    <div class="articles">
        <div class="cut"></div>
        <div>
            <p>Produit :</p>
            <p>Prix :</p>
            <p>Quantité :</p>
            <p>Action :</p>
        </div>
        <div class="cut"></div> 
        <?php
            $count = 0;
            if (isset($_SESSION['cart']))
            {
                foreach ($_SESSION['cart'] as $key => $value)
                {
                    if ($value['count'] != NULL)
                    {
                        $count += $value['product']["price"] * $value['count'];
        ?>
        <div id="<?php echo $value['product']["id"]; ?>" class="product">
            <p><?php echo htmlspecialchars($value['product']["name"]); ?></p>
            <p><?php echo htmlspecialchars($value['product']["price"]); ?>€</p>
            <p><?php echo htmlspecialchars($value['count']); ?></p>
            <div class="content">
                <div class="icon">
                    <div>
                        <a href="./controllers/cart_settings.php?add=<?php echo htmlspecialchars($key); ?>"><i class="medium material-icons icon-black">add</i></a>
                    </div>
                    <div>
                        <a href="./controllers/cart_settings.php?del=<?php echo htmlspecialchars($key); ?>"><i class="medium material-icons icon-black">delete</i></a>
                    </div>
                </div>    
            </div>
        </div>
        <div class="cut"></div>
        <?php
                    }
                }
            }
        ?>
    </div>
    <div class="total">
        <p>Total : <?php echo htmlspecialchars($count); ?>€</p>
    </div>

    <form class="gestion" action="./controllers/cart_settings.php" method="POST">
        <input type="hidden" name="submit" value="OK">
        <button type="submit" value="OK">Commander</button>
    </form>
    <form class="gestion" action="./cart.php" method="POST">
        <button type="submit" name="submit" value="OK">Supprimer le panier</button>
    </form>
  </body>
</html>