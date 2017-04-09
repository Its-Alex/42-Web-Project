    <ul class="menubar">
        <li><a href="./index.php">Accueil</a></li>
        <li><a href="./controllers/get_articles.php"><i class="small material-icons">store</i></a></li>
        <li></li>
        <li><a href="./cart.php"><i class="small material-icons">shopping_basket</i></a></li>
        <?php if ($_SESSION['token'] == "" || isset($_SESSION['token']) == false) { ?>
        <li><a href="./connexion.php">Connexion</a></li>
        <li><a href="./inscription.php">Inscription</a></li>
        <?php } else { ?>
        <li><a href="./modify.php">Compte</a></li>
        <li><a href="./logout.php">Déconnexion</a></li>
        <?php }
        if ($_SESSION['role'] == 'ADMIN' || $_SESSION['role'] == 'MODO') { ?>
        <li><a href="./controllers/gestion.php">Administration</a></li>
        <?php } ?>
    </ul>