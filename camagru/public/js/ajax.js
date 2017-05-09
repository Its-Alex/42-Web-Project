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

    request('GET', 'public/assets/remove.svg', '', (remove) => {
      request('GET', 'public/assets/update.svg', '', (update) => {
        var body = document.querySelector('.body');
        res.data.forEach((elem, index) => {
          var className = 'user' + index;
          var div = document.createElement('div');

          div.className = 'admin-user' + ' ' + className;
          var name = document.createElement('div');
          name.innerHTML = elem.name;
          div.appendChild(name);
          var mail = document.createElement('div');
          mail.innerHTML = elem.mail;
          div.appendChild(mail);
          var id = document.createElement('div');
          id.innerHTML = elem.id;
          div.appendChild(id);
          var role = document.createElement('div');
          role.innerHTML = elem.role;
          div.appendChild(role);
          var state = document.createElement('div');
          state.innerHTML = elem.state;
          div.appendChild(state);
          var date = document.createElement('div');
          date.innerHTML = elem.date;
          div.appendChild(date);
          var img = document.createElement('div');
          var aIconRemove = document.createElement('a');
          var aIconUpdate = document.createElement('a');
          if (elem.role !== 'ADMIN') {
            aIconRemove.onclick = () => { deleteUser(elem.id); };
          }
          aIconUpdate.onclick = () => { updateUserView(className, elem); };
          aIconUpdate.innerHTML = update;
          aIconRemove.innerHTML += remove;
          img.appendChild(aIconUpdate);
          img.appendChild(aIconRemove);
          div.appendChild(img);
          body.appendChild(div);
        });
      });
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

function updateUserView (className, user) {
  var body = document.querySelector('.body');

  var div = document.createElement('div');
  var name = document.createElement('input');
  var id = document.createElement('input');
  var mail = document.createElement('input');
  var role = document.createElement('input');
  var state = document.createElement('input');
  div.appendChild(name);
  div.appendChild(id);
  div.appendChild(mail);
  div.appendChild(role);
  div.appendChild(state);
  div.appendChild(createButton('update-user', 'submit', 'Modifier', () => {}));
  body.appendChild(div);
  // updateUser(user);
}
