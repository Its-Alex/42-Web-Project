HeadBar();
homeView();

var scroll;
var end;

function deleteAllElem () {
  var body = document.querySelectorAll('.body');
  body.forEach((elem) => {
    while (elem.firstChild) elem.removeChild(elem.firstChild);
  }, this);
}

function homeView () {
  deleteAllElem();
  scroll = 0;
  end = 0;

  var body = document.querySelector('.body');
  body.style.justifyContent = 'space-between';
  var containerAcceuil = document.getElementsByClassName('containerAcceuil');
  if (containerAcceuil.length === 0) {
    containerAcceuil = document.createElement('div');
    containerAcceuil.className = 'containerAcceuil';
  }

  request('GET', 'controllers/posts.php?limit=6&offset=0', '', (res) => {
    res = JSON.parse(res);

    for (var count = 0; count <= res.data.length - 1; ++count) {
      var containerImg = document.createElement('div');
      var likeDiv = document.createElement('div');
      var name = document.createElement('p');
      var img = document.createElement('img');

      containerImg.className = 'ImgAcceuil';
      likeDiv.className = 'likeDiv';
      name.className = 'nameAcceuil';
      img.className = 'imgAcceuil';

      img.src = res.data[count].link;
      img.alt = res.data[count].id;

      img.onclick = (elem) => { viewPicture(elem.target.alt); };

      // Name of author
      name.innerHTML = res.data[count].author;

      // Like view
      likeDiv = like(res.data[count].id);

      containerImg.appendChild(name);
      containerImg.appendChild(img);
      containerImg.appendChild(likeDiv);
      containerAcceuil.appendChild(containerImg);
    }
  });
  body.appendChild(containerAcceuil);
}

function galerieView () {
  deleteAllElem();
  scroll = 1;
  end = 0;

  var body = document.querySelector('.body');
  body.style.justifyContent = 'space-between';

  var containerAcceuil = document.getElementsByClassName('containerAcceuil');
  if (containerAcceuil.length === 0) {
    containerAcceuil = document.createElement('div');
    containerAcceuil.className = 'containerAcceuil';
  }

  request('GET', 'controllers/posts.php?author=1&limit=6&offset=0', '', (res) => {
    res = JSON.parse(res);

    for (var count = 0; count <= res.data.length - 1; ++count) {
      var containerImg = document.createElement('div');
      var likeDiv = document.createElement('div');
      var name = document.createElement('p');
      var img = document.createElement('img');
      var del = createButton('delGal', 'delGal', 'Supprimer', (event) => {
        request('DELETE', 'controllers/post.php', 'token=' + localStorage.getItem('id') + '&id=' + event.target.alt, (r) => {});
        containerAcceuil.removeChild(event.target.previousSibling);
        containerAcceuil.removeChild(event.target);
      });
      del.alt = res.data[count].id;

      containerImg.className = 'ImgAcceuil';
      likeDiv.className = 'likeDiv';
      name.className = 'nameAcceuil';
      img.className = 'imgAcceuil';

      img.src = res.data[count].link;
      img.alt = res.data[count].id;

      img.onclick = (elem) => { viewPicture(elem.target.alt); };

      // Name of author
      name.innerHTML = res.data[count].author;

      // Like view
      likeDiv = like(res.data[count].id);

      containerImg.appendChild(name);
      containerImg.appendChild(img);
      containerImg.appendChild(likeDiv);
      containerAcceuil.appendChild(containerImg);
      containerAcceuil.appendChild(del);
    }
  });
  body.appendChild(containerAcceuil);
}

function webcamView () {
  deleteAllElem();

  var body = document.querySelector('.body');
  body.style.justifyContent = 'flex-start';

  var video = document.createElement('video');
  video.id = 'video';
  function errCallBack (err) {
    console.log(err);
  }

  var camDiv = document.createElement('div');
  camDiv.className = 'camDiv';
  var mountingDiv = document.createElement('div');
  mountingDiv.className = 'mountingDiv';

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
  } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
  } else {
    console.error('Votre navigateur ne supporte pas GetUserMedia');
  }

  mountingDiv.appendChild(video);
  camDiv.appendChild(mountingDiv);
  camDiv.appendChild(showFilter(mountingDiv));
  body.appendChild(camDiv);
}

function userView () {
  deleteAllElem();

  var body = document.querySelector('.body');
  body.style.justifyContent = 'center';

  var oldError = document.querySelector('.error');
  if (oldError != null) {
    body.removeChild(oldError);
  }

  body.appendChild(createInput('updateUserInput', 'text', 'name', 'Name'));
  body.appendChild(createInput('updateUserInput', 'text', 'passwd', 'Mot de passe'));
  body.appendChild(createButton('updateUserInput', 'submit', 'Modifier', () => { updateSelfUser(); }));
}

function adminView () {
  deleteAllElem();

  var body = document.querySelector('.body');
  body.style.justifyContent = 'flex-start';

  request('GET', 'controllers/users.php', '', (res) => {
    res = JSON.parse(res);
    request('GET', 'public/assets/remove.svg', '', (remove) => {
      request('GET', 'public/assets/update.svg', '', (update) => {
        var body = document.querySelector('.body');
        body.style.justifyContent = 'flex-start';
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

function SignInForm () {
  deleteAllElem();
  var body = document.querySelector('.body');
  var form = document.createElement('form');
  var a = document.createElement('a');

  var body = document.querySelector('.body');
  body.style.justifyContent = 'center';

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

  var body = document.querySelector('.body');
  body.style.justifyContent = 'center';

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
  body.style.justifyContent = 'center';

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
