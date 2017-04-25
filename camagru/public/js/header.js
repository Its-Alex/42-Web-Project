function HeadBar() {
    var header = document.querySelector(".header");
    while (header.firstChild) {
        header.removeChild(header.firstChild);
    }
    var textNode = ["Accueil", "Recherche", "", "Inscription", "Connexion", "Compte", "Admin", "Déconnexion"];
    var link = ["#", "#", "#", "#", "#", "#", "#", "#"];

    textNode.forEach(function(elem, index) {
        var a = document.createElement("a");
        var li = document.createElement("li");
        a.href = link[index];
        li.appendChild(document.createTextNode(elem));
        a.appendChild(li);
        if (elem == "Accueil" || elem ==  "Recherche" || elem == "")
            header.appendChild(a);
        if (!("id" in localStorage))
        {
            if (elem == "Inscription")
                header.appendChild(a);
            if (elem == "Connexion")
                header.appendChild(a);
        }
        else
        {
            var icon = document.createElement("i");
            icon.classList.add("material-icons");
            if (elem == "Compte")
            {
                li.removeChild(li.firstChild);
                icon.appendChild(document.createTextNode("person_pin"));
                li.appendChild(icon);
                header.appendChild(a);
            }
            if (elem == "Déconnexion")
            {
                li.removeChild(li.firstChild);
                icon.appendChild(document.createTextNode("power_settings_new"));
                li.appendChild(icon);
                header.appendChild(a);
                a.onclick = () => {
                    logout();
                };
            }
            if (elem == "Admin" && localStorage.role == "ADMIN")
            {
                li.removeChild(li.firstChild);
                icon.appendChild(document.createTextNode("supervisor_account"));
                li.appendChild(icon);
                header.appendChild(a);
            }
        }
    }, this);
}