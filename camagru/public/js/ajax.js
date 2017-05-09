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

  var body = document.querySelector('.body');
  var oldError = document.querySelector('.error');
  if (oldError != null) {
    body.removeChild(oldError);
  }

  var div = document.createElement('div');
  div.className = 'inputUpdateUser';
  div.innerHTML = 'Modifier : ';
  div.appendChild(createInput('updateUserInput', 'text', 'name', 'Name'));
  div.appendChild(createInput('updateUserInput', 'text', 'passwd', 'Mot de passe'));
  div.appendChild(createButton('updateUserInput', 'submit', 'Modifier', () => { updateSelfUser(); }));
  body.insertBefore(div, body.firstChild);

  var video = document.createElement('video');
  video.id = 'video';
  function errCallBack (err) {
    console.log(err);
  }

  if (navigator.getUserMedia) {
        navigator.getUserMedia({
          audio: false,
          video: {
            width: 10,
            height: 10
          }}, (stream) => {
          video.src = window.URL.createObjectURL(stream);
          video.onloadedmetadata = (e) => {
            video.play();
          };
        }, (err) => {
          if (err) {
            console.error('L\'erreur suivante est apparu: ' + err);
          }
        });
      } else {
        console.error('Votre navigateur ne supporte pas GetUserMedia');
      }
      body.append(video);
  body.appendChild(video);
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
  var oldUpdate = document.querySelector('.inputUpdateUser');
  if (oldUpdate != null) {
    body.removeChild(oldUpdate);
  }
  var divBefore = document.querySelector('.user' + className[4]);

  var div = document.createElement('div');
  div.className = 'inputUpdateUser';
  div.innerHTML = user.mail + ' : ';
  div.appendChild(createInput('updateUserInput', 'text', 'name', 'Name'));
  div.appendChild(createInput('updateUserInput', 'text', 'role', 'Role'));
  div.appendChild(createInput('updateUserInput', 'text', 'state', 'State'));
  div.appendChild(createInput('updateUserInput', 'text', 'passwd', 'Mot de passe'));
  div.appendChild(createButton('updateUserInput', 'submit', 'Modifier', () => { updateUser(user); }));
  body.insertBefore(div, divBefore);
}
