HeadBar();

function deleteAllElem() {
  var body = document.querySelectorAll('.hide');
  body.forEach((elem) => {
    while (elem.firstChild) elem.removeChild(elem.firstChild);
  }, this);
}

function createInput(clas, type, name, placeholder) {
  var input = document.createElement('input');
  input.className = clas;
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  return (input);
}

function createButton(clas, name, value, onclick) {
  var input = document.createElement('input');
  input.className = clas;
  input.type = 'button';
  input.name = name;
  input.value = value;
  input.onclick = onclick;
  return (input);
}

function SignInForm() {
  deleteAllElem();
  var div = document.querySelector('.signin');
  div.appendChild(createInput('signin', 'email', 'mail', 'Mail'));
  div.appendChild(createInput('signin', 'password', 'passwd', 'Mot de passe'));
  div.appendChild(createButton('signin', 'submit', 'Connexion', () => { signin(); }));
}

function SignUpForm() {
  deleteAllElem();
  var div = document.querySelector('.signup');
  div.appendChild(createInput('signup', 'name', 'name', 'Nom'));
  div.appendChild(createInput('signup', 'email', 'mail', 'Mail'));
  div.appendChild(createInput('signup', 'password', 'passwd', 'Mot de passe'));
  div.appendChild(createInput('signup', 'password', 'confirmPasswd', 'Confirmation mot de passe'));
  div.appendChild(createButton('signup', 'submit', 'Inscription', () => { signup(); }));
}

