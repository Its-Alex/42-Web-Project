function signup () {
  request('POST', 'controllers/signup.php', getElemForm('.signup'), (res) => {
    res = JSON.parse(res);
    if (res.err !== '' && res.err !== undefined && res.err !== null) {
      var form = document.querySelector('.signup');      
      var error = document.createElement('p');
      if (form.firstChild.nodeName === 'P') form.removeChild(form.firstChild);
      error.className = 'error';
      error.innerHTML = res.err;
      form.insertBefore(error, form.firstChild);
    }
    if (res.success === true) homeView();
  });
}

function signin () {
  request('POST', 'controllers/user.php', getElemForm('.signin'), (res) => {
    res = JSON.parse(res);
    request('GET', 'controllers/user.php', '', (data) => {
      var session = JSON.parse(data);

      if ('id' in session) {
        window.localStorage.setItem('id', session.id);
      }
      if ('mail' in session) {
        window.localStorage.setItem('mail', session.mail);
      }
      if ('role' in session) {
        window.localStorage.setItem('role', session.role);
      }
      HeadBar();
    });
    if (res.err !== '' && res.err !== undefined && res.err !== null) {
      var form = document.querySelector('.signin');      
      var error = document.createElement('p');

      if (form.firstChild.nodeName === 'P') form.removeChild(form.firstChild);
      error.className = 'error';
      error.innerHTML = res.err;
      form.insertBefore(error, form.firstChild);
    }
    if (res.success === true) homeView();
  });
}

function forgetPwd () {
  request('POST', 'controllers/forgetPwd.php', getElemForm('.forgetPwd'), (res) => {
    res = JSON.parse(res);
    if (res.err !== '' && res.err !== undefined && res.err !== null) {
      var form = document.querySelector('.forgetPwd');
      var error = document.createElement('p');

      if (form.firstChild.nodeName === 'P') form.removeChild(form.firstChild);
      error.className = 'error';
      error.innerHTML = res.err;
      form.insertBefore(error, form.firstChild);
    }
    if (res.success === true) homeView();
  });
}
