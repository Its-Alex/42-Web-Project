HeadBar();

function deleteAllElem () {
  var body = document.querySelectorAll('.body');
  body.forEach((elem) => {
    while (elem.firstChild) elem.removeChild(elem.firstChild);
  }, this);
}

function createInput (className, type, name, placeholder) {
  var input = document.createElement('input');
  input.className = className;
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  return (input);
}

function createButton (className, name, value, onclick) {
  var input = document.createElement('input');
  input.className = className;
  input.type = 'button';
  input.name = name;
  input.value = value;
  input.onclick = onclick;
  return (input);
}

function homeView () {
  deleteAllElem();
}

function createImgView () {
  deleteAllElem();
}

function adminView () {
  deleteAllElem();

  request('GET', 'controllers/users.php', '', (res) => {
    res = JSON.parse(res);

    var body = document.querySelector('.body');
    res.data.forEach((elem) => {
      var div = document.createElement('div');

      div.className = 'admin-user';
      for (index in elem) {
        var p = document.createElement('p');
        p.innerHTML = index + ' : ' + elem[index];
        console.log(res.data[index]);     
        div.appendChild(p);
        // div.appendChild(document.createElement('br'));
      }
      body.appendChild(div);
    });
  });
}

function searchView () {
  deleteAllElem();
}

function SignInForm () {
  deleteAllElem();
  var body = document.querySelector('.body');
  var form = document.createElement('form');
  var a = document.createElement('a');

  form.className = 'form signin';
  a.innerHTML = 'Mot de passe oublié ?';
  a.style = 'font-size: 15px; margin: 5px;';
  a.onclick = () => { forgetPwdForm(); };
  form.appendChild(createInput('signin', 'email', 'mail', 'Mail'));
  form.appendChild(createInput('signin', 'password', 'passwd', 'Mot de passe'));
  form.appendChild(createButton('signin', 'submit', 'Connexion', () => { signin(); }));
  form.appendChild(a);
  body.appendChild(form);
}

function SignUpForm () {
  deleteAllElem();
  var body = document.querySelector('.body');
  var form = document.createElement('form');

  form.className = 'form signup';
  form.appendChild(createInput('signup', 'name', 'name', 'Nom'));
  form.appendChild(createInput('signup', 'email', 'mail', 'Mail'));
  form.appendChild(createInput('signup', 'password', 'passwd', 'Mot de passe'));
  form.appendChild(createInput('signup', 'password', 'confirmPasswd', 'Confirmation mot de passe'));
  form.appendChild(createButton('signup', 'submit', 'Inscription', () => { signup(); }));
  body.appendChild(form);
}

function forgetPwdForm () {
  deleteAllElem();
  var body = document.querySelector('.body');
  var form = document.createElement('form');

  form.className = 'form forgetPwd';
  form.appendChild(createInput('forgetPwd', 'email', 'mail', 'Mail'));
  form.appendChild(createButton('forgetPwd', 'submit', 'Envoyé un mail', () => { forgetPwd(); }));
  body.appendChild(form);
}
