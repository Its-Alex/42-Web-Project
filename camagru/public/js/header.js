function HeadBar () {
  var header = document.querySelector('.header');
  while (header.firstChild) {
    header.removeChild(header.firstChild);
  }
  var textNode = ['Accueil', 'Recherche', '', 'Inscription', 'Connexion', 'Galerie', 'Webcam', 'Compte', 'Admin', 'Déconnexion'];
  var onclick = [() => {
    homeView();
  }, () => {
  }, () => {
  }, () => {
    SignUpForm();
  }, () => {
    SignInForm();
  }, () => {
    galerieView();
  }, () => {
    webcamView();
  }, () => {
    userView();
  }, () => {
    adminView();
  }, () => {
    request('POST', 'controllers/logout.php', null, (res) => {
      window.localStorage.clear();
      HeadBar();
      homeView();
    });
  }];

  textNode.forEach((elem, index) => {
    var a = document.createElement('a');
    var li = document.createElement('li');
    a.onclick = onclick[index];
    li.appendChild(document.createTextNode(elem));
    a.appendChild(li);
    if (elem === 'Accueil' || elem === '') {
      header.appendChild(a);
    }
    if (elem === 'Recherche') {
      var searchBar = document.createElement('input');

      li.removeChild(li.firstChild);
      searchBar.className = 'searchBar';
      searchBar.placeholder = 'Recherche...';
      li.appendChild(searchBar);
      header.appendChild(a);
    }
    if (!('id' in window.localStorage)) {
      if (elem === 'Inscription') header.appendChild(a);
      if (elem === 'Connexion') header.appendChild(a);
    } else {
      var icon = document.createElement('i');
      icon.classList.add('material-icons');
      if (elem === 'Galerie') {
        li.removeChild(li.firstChild);
        icon.appendChild(document.createTextNode('contacts'));
        li.appendChild(icon);
        header.appendChild(a);
      }
      if (elem === 'Webcam') {
        li.removeChild(li.firstChild);
        icon.appendChild(document.createTextNode('picture_in_picture'));
        li.appendChild(icon);
        header.appendChild(a);
      }
      if (elem === 'Compte') {
        li.removeChild(li.firstChild);
        icon.appendChild(document.createTextNode('person_pin'));
        li.appendChild(icon);
        header.appendChild(a);
      }
      if (elem === 'Déconnexion') {
        li.removeChild(li.firstChild);
        icon.appendChild(document.createTextNode('power_settings_new'));
        li.appendChild(icon);
        header.appendChild(a);
      }
      if (elem === 'Admin' && window.localStorage.role === 'ADMIN') {
        li.removeChild(li.firstChild);
        icon.appendChild(document.createTextNode('supervisor_account'));
        li.appendChild(icon);
        header.appendChild(a);
      }
    }
  }, this);
}
